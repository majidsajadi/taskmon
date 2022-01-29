import { useQuery } from "react-query";
import usePagination from "./usePagination";
import client from "../client";
import { JobStatus } from "../types";

export function useJobs(queueName?: string, type?: JobStatus) {
  const { page, pageSize } = usePagination();
  const query = { pageSize, page, type: type as string };

  return useQuery(
    ["jobs", queueName, query],
    () => {
      if (queueName) {
        return client.job.list(queueName, query).then((data) => data.jobs);
      }
    },
    {
      enabled: !!queueName && !!type,
    }
  );
}
