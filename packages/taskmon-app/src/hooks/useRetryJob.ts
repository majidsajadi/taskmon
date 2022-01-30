import { useMutation, useQueryClient } from "react-query";
import client from "../client";

export function useRetryJob() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ queueName, jobId }: { queueName: string; jobId: string }) => {
      return client.job.retry(queueName, jobId);
    },
    {
      onSuccess: () => {
        // TODO: update the queue info manually (maybe?)
        queryClient.invalidateQueries("jobs");
        queryClient.invalidateQueries("queue");
      },
    }
  );
}
