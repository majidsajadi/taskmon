export enum JobStatus {
  COMPLETED = "completed",
  FAILED = "failed",
  DELAYED = "delayed",
  ACTIVE = "active",
  WAITING = "waiting",
  PAUSED = "paused",
  // REPEAT = "repeat",
}

export type Job = {
  id: string;
  // The name of the Job
  name: string;
  // The payload for this job.
  data: any;
  // The options object for this job.
  opts: any;
  // The progress a job has performed so far.
  // progress: number | object;
  progress: number;
  // The value returned by the processor when processing this job.
  returnvalue: any;
  // Stacktrace for the error (for failed jobs).
  stacktrace: string[];
  // Timestamp when the job was created (unless overridden with job options).
  timestamp: number;
  // Number of attempts after the job has failed.
  attemptsMade: number;
  // Reason for failing.
  failedReason?: string;
  // Timestamp for when the job finished (completed or failed).
  finishedOn?: number;
  // Timestamp for when the job was processed.
  processedOn?: number;
  // Fully qualified key (including the queue prefix) pointing to the parent of this job.
  parentKey?: string;
};

export type QueueInfo = {
  name: string;
  totalCount: number;
};

export type ProcessTimes = {
  min: number;
  max: number;
  avg: number;
};

export type QueueDetail = QueueInfo & {
  paused: boolean;
  counts: Record<string, number>;
  processTimes: ProcessTimes;
  clientInfo: Record<string, any>;
};

export type QueueListResponse = {
  queues: QueueInfo[];
};

export type WorkerListResponse = {
  workers: Record<JobStatus, string>[];
};

export type ListJobsResponse = {
  jobs: Job[];
};

export type QueueResponse = {
  queue: QueueDetail;
};

type RepeatOpts = {
  cron?: string; // Cron string
  tz?: string; // Timezone
  startDate?: Date | string | number; // Start date when the repeat job should start repeating (only with cron).
  endDate?: Date | string | number; // End date when the repeat job should stop repeating.
  limit?: number; // Number of times the job should repeat at max.
  every?: number; // Repeat every millis (cron setting cannot be used together with this setting.)
  count?: number; // The start value for the repeat iteration count.
  readonly key: string; // The key for the repeatable job metadata in Redis.
}

type BackoffOpts = {
  // Backoff type, which can be either `fixed` or `exponential`. A custom backoff strategy can also be specified in `backoffStrategies` on the queue settings.
  type: string; 
  // Backoff delay, in milliseconds.
  delay: number;
}

type KeepJobs = {
  // Maximum age in *seconds* for job to be kept.
  age?: number;
  // Maximum count of jobs to be kept.
  count?: number;
}

type JobOpts = {
  // Priority value. ranges from 1 (highest priority) to MAX_INT (lowest priority). 
  priority?: number; 
  // An amount of milliseconds to wait until this job can be processed.
  delay?: number; 
  // The total number of attempts to try the job until it completes.
  attempts: number; 
  // Repeat job according to a cron specification, see below for details.
  repeat: RepeatOpts; 
  // Backoff setting for automatic retries if the job fails, default strategy: `fixed`.
  // Needs `attempts` to be set.
  backoff: number | BackoffOpts; 
  // if true, adds the job to the right of the queue instead of the left (default false)
  lifo: boolean; 
  // The number of milliseconds after which the job should fail with a timeout error
  timeout: number; 
  // Override the job ID - by default, the job ID is a unique integer, 
  // but you can use this setting to override it.
  // If you use this option, it is up to you to ensure the
  // jobId is unique. If you attempt to add a job with an id that
  // already exists, it will not be added (see caveat below about repeatable jobs).
  jobId: number | string; 
  // If true, removes the job when it successfully completes
  removeOnComplete: boolean | number | KeepJobs; 
  // If true, removes the job when it fails after all attempts.
  removeOnFail: boolean | number | KeepJobs;  
  // Limits the amount of stack trace lines that will be recorded in the stacktrace.
  stackTraceLimit: number; 
}