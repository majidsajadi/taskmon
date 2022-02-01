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
      "hover:bg-teal-600 hover:text-white w-full rounded-md p-2 block truncate font-medium flex justify-between items-center",
      match && "bg-teal-600 text-white"
    );

  const renderQueueItem = (queue: QueueInfo) => {
    const to = `/queues/${queue.name}`;
    const match = matchPath(to, location.pathname) ?? false;
    // TODO: generate id here
    return (
      <li key={queue.name}>
        <Link to={to} className={getQueueItemCLS(!!match)}>
          <span>{queue.name}</span>
          <span >
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
      <li className="w-full h-10 rounded-md bg-gray-100"></li>
      <li className="w-full h-10 rounded-md bg-gray-100"></li>
      <li className="w-full h-10 rounded-md bg-gray-100"></li>
      <li className="w-full h-10 rounded-md bg-gray-100"></li>
    </ul>
  );

  const renderFilter = () => (
    <div className="w-full mb-2">
      <div className="flex">
        <input
          type="text"
          className="flex-1 block border rounded-md px-2"
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
