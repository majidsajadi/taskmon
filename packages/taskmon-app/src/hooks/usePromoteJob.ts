import { useMutation, useQueryClient } from "react-query";
import client from "../client";

export function usePromoteJob() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ queueName, jobId }: { queueName: string; jobId: string }) => {
      return client.job.promote(queueName, jobId);
    },
    {
      onSuccess: () => {
        // TODO: update the queue info manually (maybe?)
        queryClient.invalidateQueries("jobs");
      },
    }
  );
}
