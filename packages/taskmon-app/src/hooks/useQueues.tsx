import { useQuery } from "react-query";
import client from "../client";

export function useQueues() {
  return useQuery("queues", () =>
    client.queue.list().then((data) => data.queues),
  );
}
