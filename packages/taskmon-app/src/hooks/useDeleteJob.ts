import { useMutation, useQueryClient } from "react-query";
import client from "../client";

export function useDeleteJob() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ queueName, jobId }: { queueName: string; jobId: string }) => {
      return client.job.delete(queueName, jobId);
    },
    {
      onSuccess: () => {
        // TODO: update the queue info manually (maybe?)
        queryClient.invalidateQueries("jobs");
      },
    }
  );
}
