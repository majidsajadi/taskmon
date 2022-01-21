import { Job, Queue } from "bullmq";
import { RedisOptions } from "ioredis";
import { GetJobOption, Options, Provider, QueueInfo } from "./base";

class BullMQProvider implements Provider<Queue, Job> {
  connection: RedisOptions;
  queues: Record<string, Queue> = {};

  constructor(options: Options) {
    // TODO: validate connection
    this.connection = options.connection
  }
  
  getQueue(name: string) {
    if (this.queues[name]) {
      return this.queues[name]
    }

    const queue = new Queue(name, { connection: this.connection });
    this.queues[name] = queue;

    return queue
  }

  getQueues(): QueueInfo[] {
    return [];
  }

  // TODO: use JobType from bullMQ. not implemented yet. (next release)
  getJobs(
    queueName: string,
    type: string,
    option: GetJobOption
  ): Promise<Job[]> {
    const queue = this.getQueue(queueName);
    return queue.getJobs([type]);
  }
}

export default BullMQProvider;
