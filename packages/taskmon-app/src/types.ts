export enum JobStatus {
  COMPLETED = "completed",
  FAILED = "failed",
  DELAYED = "delayed",
  ACTIVE = "active",
  WAIT = "wait",
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

export type QueueListResponse = {
  name: string;
  jobsCount: number;
};

