import classNames from "classnames";
import { useQueryClient } from "react-query";
import { useSearchParams } from "react-router-dom";
import { FiRefreshCw } from "react-icons/fi";
import { JobStatus } from "../../types";
import { Button, Tooltip } from "../base";

type QueueStateTabsProps = {
  currentState?: JobStatus;
  counts: Record<string, number>;
};

export function QueueStateTabs({ currentState, counts }: QueueStateTabsProps) {
  const queryClient = useQueryClient();
  const [_, setSearchParams] = useSearchParams();

  const statusList = Object.values(JobStatus);

  const handleRefresh = () => {
    queryClient.invalidateQueries("jobs");
  };

  const getClassName = (active: boolean) =>
    classNames(
      "inline-block py-4 px-4 cursor-pointer font-medium text-center border-b-2 flex space-x-2 uppercase text-sm",
      active
        ? "border-teal-600 text-teal-600"
        : "border-transparent hover:border-gray-100"
    );

  return (
    <div className="flex items-center justify-between border-b border-gray-100">
      <ul className="flex flex-wrap">
        {statusList.map((status) => (
          <li className="mr-2" key={status}>
            <div
              onClick={() => setSearchParams({ status })}
              key={status}
              className={getClassName(status === currentState)}
            >
              <span>{status}</span>
              <span>{counts[status]}</span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mx-4">
        <Tooltip content="Refresh">
          <Button onClick={handleRefresh} type="link" icon={<FiRefreshCw />} />
        </Tooltip>
      </div>
    </div>
  );
}
