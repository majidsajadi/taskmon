import { Job, Queue, JobsOptions } from "bullmq";
import { RedisOptions } from "ioredis";
import { GetJobOption, Options, Provider, QueueInfo } from "./base";
import Messages from "../utils/message";
import parseRedisInfo from "../utils/redis-info";
import redis from "../redis";

// TODO: Move this to config
const DEFAULT_PAGE_SIZE = 10;

enum JobStates {
  Paused = "paused",
  Completed = "completed",
  Failed = "failed",
  Delayed = "delayed",
  Waiting = "waiting",
  Active = "active",
}

class BullMQProvider implements Provider<Queue, Job, JobsOptions> {
  connection: RedisOptions;
  prefix: string;
  queues: Record<string, Queue> = {};

  constructor(options: Options) {
    // TODO: validate connection
    this.connection = options.connection;
    this.prefix = options.prefix || "bull";
  }

  /**
   * Get queue by name
   * Call initQueue if queue not found in first try then throw an error
   * @param name queue name
   * @returns {Queue} queue
   */
  async getQueue(name: string) {
    if (!this.queues[name]) {
      await this.initQueues();
    }

    const queue = this.queues[name];

    if (!queue) {
      throw new Error(Messages.QUEUE_NOT_FOUND);
    }

    return this.queues[name];
  }

  /**
   * Search for bull queue (by prefix) in redis
   */
  async initQueues() {
    const keys = await redis.keys(`${this.prefix}:*`);
    const queueNames = new Set(keys.map((key) => key.split(":")[1]));

    queueNames.forEach((qn) => {
      if (!this.queues[qn]) {
        this.queues[qn] = new Queue(qn, { connection: this.connection });
      }
    });
  }

  /**
   * Get queue Redis client info
   * We use queueName so in future we can support multiple connection
   * For now the config only support a single Redis connection
   * @param queueName queue name
   */
  async getRedisClientInfo(queueName: string) {
    const queue = await this.getQueue(queueName);
    const client = await queue.client;
    const info = await client.info()
    // TODO: pick desired properties
    // TODO: conver to camelCase
    return parseRedisInfo(info);
  }

  /**
   * Get queue job counts by types
   * @param name queue name
   * @returns queue job counts by type
   */
  async getQueueJobCounts(name: string) {
    const queue = this.queues[name];
    const states = Object.values(JobStates);
    return queue.getJobCounts(...states);
  }

  /**
   * Get queue total job counts
   * @param name queue name
   * @returns queue total job counts
   */
  async getQueueTotalJobCounts(name: string) {
    const queue = this.queues[name];
    const states = Object.values(JobStates);
    return queue.getJobCountByTypes(...states);
  }

  /**
   * Get queue job counts by types
   * @param name queue name
   * @returns queue job counts by type
   */
  async isQueuePause(name: string) {
    const queue = this.queues[name];
    return queue.isPaused();
  }

  /**
   * Get Time spent in the workers
   * @param name queue name
   * @returns process times of queue jobs
   */
  async getQueueProcessTimes(name: string) {
    const queue = await this.getQueue(name);
    const jobs = await queue.getJobs([JobStates.Completed, JobStates.Failed]);

    let max = 0;
    let min = Infinity;
    let sum = 0;

    jobs.forEach(async (job) => {
      let pt = 0;

      if (job.finishedOn && job.processedOn) {
        pt = job.finishedOn - job.processedOn;
      }

      if (pt > max) max = pt;
      if (pt < min) min = pt;

      sum += pt;
    });

    const avg = sum / jobs.length;

    return {
      min,
      max,
      avg,
    };
  }

  /**
   * Get list of all queues with counts and pause state
   * @returns an array of queues
   */
  async getQueuesInfo() {
    await this.initQueues();
    const queueNames = Object.keys(this.queues);

    return Promise.all(
      queueNames.map(async (name) => {
        const totalCount = await this.getQueueTotalJobCounts(name);
        return {
          name,
          totalCount,
        };
      })
    );
  }

  /**
   * Get queue info
   * @param name queue name
   * @returns queue info
   */
  async getQueueInfo(name: string) {
    await this.getQueue(name);
    const [paused, totalCount, counts, processTimes, clientInfo] = await Promise.all([
      this.isQueuePause(name),
      // TODO: we can get totalCount from getQueueJobCounts
      // this way we remove a redis lookup
      this.getQueueTotalJobCounts(name),
      this.getQueueJobCounts(name),
      this.getQueueProcessTimes(name),
      this.getRedisClientInfo(name)
    ]);

    return {
      name,
      paused,
      totalCount,
      counts,
      processTimes,
      clientInfo,
    };
  }

  /**
   * Pause/resume queue
   * @param name queue name
   */
  async pauseQueue(name: string) {
    const isPaused = await this.isQueuePause(name);
    const queue = await this.getQueue(name);

    if (isPaused) {
      await queue.resume();
    } else {
      await queue.pause();
    }
  }

  /**
   * Completely destroys the queue and all of its contents irreversibly
   * This method will the *pause* the queue and requires that there are no
   * active jobs
   * @param name queue name
   */
  async destroyQueue(name: string) {
    const queue = await this.getQueue(name);
    await queue.obliterate();
  }

  /**
   * Add a new job to the queue
   * @param queueName queue name
   * @param jobName job name
   * @param data job data
   * @param options job options
   */
  async addJob(
    queueName: string,
    jobName: string,
    data: any,
    options: JobsOptions
  ) {
    const queue = await this.getQueue(queueName);
    await queue.add(jobName, data, options);
  }

  /**
   * Get list of jobs in desired queue
   * TODO: use JobType from bullMQ. not implemented yet. (next release)
   * @param queueName queue name
   * @param type job state
   * @param option pagination options
   * @returns list of jobs
   */
  async getJobs(queueName: string, type: string, option: GetJobOption) {
    const queue = await this.getQueue(queueName);

    const page = option.page ?? 1;
    const pageSize = option.pageSize ?? DEFAULT_PAGE_SIZE;

    const end = pageSize * page;
    const start = end - pageSize;

    return queue.getJobs([type], start, end - 1);
  }

  /**
   * Get job by id
   * @param queueName queue name
   * @param jobId job id
   * @returns {Job} job
   */
  async getJob(queueName: string, jobId: string) {
    const queue = await this.getQueue(queueName);
    const job = await queue.getJob(jobId);

    if (!job) {
      throw new Error(Messages.QUEUE_NOT_FOUND);
    }

    return job;
  }

  /**
   * Get job by id
   * @param queueName queue name
   * @param jobId job id
   */
  async removeJob(queueName: string, jobId: string) {
    const job = await this.getJob(queueName, jobId);
    await job.remove();
  }

  /**
   * Retry a failed job
   * @param queueName queue name
   * @param jobId job id
   */
  async retryJob(queueName: string, jobId: string) {
    const job = await this.getJob(queueName, jobId);
    const isFailed = await job.isFailed();

    if (!isFailed) {
      throw new Error(Messages.JOB_IS_NOT_FAILED);
    }
    await job.retry();
  }

  /**
   * Promote a delayed job
   * @param queueName queue name
   * @param jobId job id
   */
  async promoteJob(queueName: string, jobId: string) {
    const job = await this.getJob(queueName, jobId);
    const isDelayed = await job.isDelayed();

    if (!isDelayed) {
      throw new Error(Messages.JOB_IS_NOT_DELAYED);
    }
    await job.promote();
  }

  /**
   * Get list of queue workers
   * @param queueName queue name
   * @returns list of workers
   */
  async getWorkers(queueName: string) {
    const queue = await this.getQueue(queueName);

    return queue.getWorkers();
  }
}

export default BullMQProvider;
