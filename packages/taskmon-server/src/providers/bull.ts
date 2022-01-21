import Queue, { JobStatus,Job as IJob, Queue as IQueue } from "bull";
import { RedisOptions } from "ioredis";
import { GetJobOption, Options, Provider, QueueInfo } from "./base";

class BullProvider implements Provider<IQueue, IJob> {
  connection: RedisOptions;
  queues: Record<string, IQueue> = {};

  constructor(options: Options) {
    // TODO: validate connection
    this.connection = options.connection
  }

  getQueue(name: string) {
    if (this.queues[name]) {
      return this.queues[name]
    }

    const queue = new Queue(name, { redis: this.connection });
    this.queues[name] = queue;

    return queue
  }
  
  getQueues(): QueueInfo[] {
    return [];
  }

  getJobs(
    queueName: string,
    type: JobStatus,
    option: GetJobOption
  ): Promise<IJob[]> {
    const queue = this.getQueue(queueName);
    return queue.getJobs([type]);
  }
}

export default BullProvider;
