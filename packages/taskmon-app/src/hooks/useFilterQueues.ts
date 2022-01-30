import { useMemo, useState } from "react";
import { QueueInfo } from "../types";

export function useFilterQueues(queues?: QueueInfo[]) {
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    if (filter) {
      return queues?.filter((queue) => queue.name.includes(filter));
    }

    return queues;
  }, [filter, queues]);

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  return {
    filter,
    onFilter,
    filtered
  };
}
