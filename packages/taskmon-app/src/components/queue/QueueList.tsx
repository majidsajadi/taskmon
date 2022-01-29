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

  const getQueueItemCLS = (match: boolean) =>
    classNames(
      "hover:bg-slate-100 w-full rounded px-2 py-1 block truncate flex justify-between items-center",
      match && "bg-slate-100"
    );

  const renderQueueItem = (queue: QueueInfo) => {
    const to = `/queues/${queue.name}`;
    const match = matchPath(to, location.pathname) ?? false;
    // TODO: generate id here
    return (
      <li key={queue.name}>
        <Link to={to} className={getQueueItemCLS(!!match)}>
          <span>{queue.name}</span>
          <span className="px-2 py-1 text-teal-600 rounded bg-slate-50">
            {queue.totalCount}
          </span>
        </Link>
      </li>
    );
  };

  const renderQueues = () => (
    <ul className="flex flex-col space-y-2">
      {filtered?.map(renderQueueItem)}
    </ul>
  );

  const renderSkeleton = () => (
    <ul className="flex flex-col space-y-2 animate-pulse">
      <li className="w-full h-10 rounded bg-slate-100"></li>
      <li className="w-full h-10 rounded bg-slate-100"></li>
      <li className="w-full h-10 rounded bg-slate-100"></li>
      <li className="w-full h-10 rounded bg-slate-100"></li>
    </ul>
  );

  const renderFilter = () => (
    <div className="w-full mb-2">
      <div className="flex">
        <input
          type="text"
          className="flex-1 block border rounded px-2"
          value={filter}
          onChange={onFilter}
        />
        <Button type="link" icon={<FiRefreshCw />} onClick={handleRefresh} />
      </div>
    </div>
  );

  // TODO: overflow
  return (
    <div>
      {renderFilter()}
      {isFetching ? renderSkeleton() : renderQueues()}
    </div>
  );
}
