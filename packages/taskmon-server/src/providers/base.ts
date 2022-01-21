import { RedisOptions } from "ioredis";

export type QueueInfo = {
  name: string;
  counts: Record<string, number>;
};

export type GetJobOption = {
  page: number;
  pageSize: number;
};

export type Options = {
  connection: RedisOptions;
};

export interface Provider<Queue = unknown, Job = any> {
  connection: RedisOptions;
  queues: Record<string, Queue>
  
  getQueue(name: string): Queue;
  getQueues(): QueueInfo[];
  getJobs(queue: string, type: string, option: GetJobOption): Promise<Job[]>;
}
