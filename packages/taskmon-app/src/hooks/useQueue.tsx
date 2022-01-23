import { useCallback, useMemo } from "react";
import useReq from "use-req";
import client from "../client";
import { QueueInfo, QueueListResponse } from "../types";

type Queue = QueueInfo & { totalCount: number };

export type QueueState = {
  queues: Queue[];
  queueLoading: boolean;
  fetchQueues: () => Promise<QueueListResponse>;
  selectQueue: (name: string) => Queue | undefined;
}

export const useQueue = (): QueueState => {
  const { data, loading: queueLoading, run } = useReq(client.queue.list);

  const queues = useMemo(() => {
    if (!data) return [];

    return data.queues.map((queue) => {
      const totalCount = Object.values(queue.counts).reduce(
        (prev, curr) => prev + curr,
        0
      );

      return {
        ...queue,
        totalCount,
      };
    });
  }, [data]);

  const selectQueue = useCallback(
    (name: string) => {
      return queues.find((queue) => queue.name === name);
    },
    [queues]
  );

  const fetchQueues = useCallback(() => run(), []);

  return {
    queues,
    queueLoading,
    fetchQueues,
    selectQueue,
  };
};
