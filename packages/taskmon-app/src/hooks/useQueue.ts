import { useQuery } from "react-query";
import client from "../client";

export function useQueue(queueName?: string) {
  return useQuery(
    ["queue", queueName],
    () => {
      if (queueName) {
        return client.queue.stats(queueName).then((data) => data.queue);
      }
    },
    {
      enabled: !!queueName,
    }
  );
}
