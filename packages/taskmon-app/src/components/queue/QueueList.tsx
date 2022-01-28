import classNames from "classnames";
import { matchPath, useLocation, Link } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { useQueryClient } from "react-query";
import { Button } from "../base";
import { useQueues } from "../../hooks/useQueues";
import { useFilterQueues } from "../../hooks/useFilterQueues";
import { QueueInfo } from "../../types";

export function QueueList() {
  const location = useLocation();
  const queryClient = useQueryClient();

  const { data: queues, isFetching } = useQueues();
  const { filter, filtered, onFilter } = useFilterQueues(queues);

  const handleRefresh = () => {
    queryClient.invalidateQueries("queues");
  };

  const getLinkCLS = (match: boolean) =>
    classNames(
      "hover:bg-slate-100 w-full rounded px-4 py-2 block truncate space-x-2 flex justify-between",
      match && "bg-slate-100"
    );

  const renderQueueItem = (queue: QueueInfo) => {
    const to = `/queues/${queue.name}`;
    const match = matchPath(to, location.pathname) ?? false;
    // TODO: generate id here
    return (
      <Link className={getLinkCLS(!!match)} key={queue.name} to={to}>
        <span>{queue.name}</span>
        <span className="text-teal-600">{queue.totalCount}</span>
      </Link>
    );
  };

  if (isFetching) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex-none">
      <h3 className="mb-2 font-medium tracking-wider uppercase">Queues</h3>
      <div className="flex w-full mb-2">
        <input
          type="text"
          className="flex-1 block border rounded"
          value={filter}
          onChange={onFilter}
        />
        <Button type="link" icon={<FiRefreshCw />} onClick={handleRefresh} />
      </div>
      {filtered?.map(renderQueueItem)}
    </div>
  );
}
