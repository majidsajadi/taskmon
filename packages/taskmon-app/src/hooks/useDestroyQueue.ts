import { useMutation, useQueryClient } from "react-query";
import client from "../client";

export function useDestroyQueue() {
  const queryClient = useQueryClient();
  return useMutation(
    (queueName: string) => {
      return client.queue.destroy(queueName);
    },
    {
      onSuccess: () => {
        // TODO: update the queue info manually (maybe?)
        queryClient.invalidateQueries("queues");
        queryClient.invalidateQueries("queue");
      },
    }
  );
}
