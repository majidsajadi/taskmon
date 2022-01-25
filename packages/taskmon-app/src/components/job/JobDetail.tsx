import { Job } from "../../types";

type JobDetailProps = {
  job: Job;
};

export function JobDetail({job}: JobDetailProps) {
  return (
    <div>{job.name}</div>
  );
}
