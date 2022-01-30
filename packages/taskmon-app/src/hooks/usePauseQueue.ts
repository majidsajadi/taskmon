import { useMutation, useQueryClient } from "react-query";
import client from "../client";

export function usePauseQueue() {
  const queryClient = useQueryClient();
  return useMutation(
    (queueName: string) => {
      return client.queue.pause(queueName);
    },
    {
      onSuccess: () => {
        // TODO: update the queue info manually (maybe?)
        queryClient.invalidateQueries("queue");
      },
    }
  );
}
