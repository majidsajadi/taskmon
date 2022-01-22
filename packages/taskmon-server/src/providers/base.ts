import { RedisOptions } from "ioredis";

export type QueueInfo = {
  name: string;
  counts: Record<string, number>;
  paused: boolean;
};

export type GetJobOption = {
  page: number;
  pageSize: number;
};

export type Options = {
  connection: RedisOptions;
  prefix: string;
};

export interface Provider<Queue = unknown, Job = any, JobsOptions = any> {
  connection: RedisOptions;
  prefix: string;
  queues: Record<string, Queue>;

  getQueue(name: string): Promise<Queue>;
  initQueues(): Promise<void>;
  getQueueJobCounts(name: string): Promise<Record<string, number>>;
  isQueuePause(name: string): Promise<boolean>;
  getQueuesInfo(): Promise<QueueInfo[]>;
  destroyQueue(queue: string): Promise<void>;
  addJob(queueName: string, jobName: string, data: any, options: JobsOptions): Promise<void>
  getJobs(queueName: string, type: string, option: GetJobOption): Promise<Job[]>;
  getJob(queueName: string, jobId: string): Promise<Job>;
  removeJob(queueName: string, jobId: string): Promise<void>;
  retryJob(queueName: string, jobId: string): Promise<void>;
  promoteJob(queueName: string, jobId: string): Promise<void>;
  getWorkers(queueName: string): Promise<Record<string, string>[]>;
}
