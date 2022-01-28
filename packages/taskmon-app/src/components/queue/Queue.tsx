import { useContext, useEffect, useMemo } from "react";
import classNames from "classnames";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FiPause, FiPlay } from "react-icons/fi";
import { Button } from "../base";
import { JobList } from "../job/JobList";
import { AppContext } from "../../context/App";
import { JobStatus } from "../../types";
import { QueueInfo } from "./QueueInfo";

export function Queue() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { queues } = useContext(AppContext);

  const statusList = Object.values(JobStatus);
  const queueName = params.queueName;
  const queue = useMemo(
    () => queues?.find((queue) => queue.name === queueName),
    [queueName, queueName]
  );

  // TODO: handle queue not found
  if (!queue) {
    navigate("/error");
    return <div></div>;
  }

  const currStatus = useMemo(
    () => searchParams.get("status") || "",
    [searchParams]
  );

  useEffect(() => {
    if (!currStatus) {
      setSearchParams({ status: JobStatus.COMPLETED });
    }
  }, [currStatus]);

  const renderHeader = () => (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold">{queueName}</h3>
      <div className="flex space-x-2">
        {queue.paused ? (
          <Button icon={<FiPlay className="text-lg" />}>RESUME</Button>
        ) : (
          <Button icon={<FiPause className="text-lg" />}>PAUSE</Button>
        )}
        <Button type="primary">NEW JOB</Button>
      </div>
    </div>
  );

  const getClassName = (active: boolean) =>
    classNames(
      "inline-block py-4 px-4 cursor-pointer font-medium text-center border-b-2",
      active
        ? "border-teal-600 text-teal-600"
        : " border-transparent hover:border-slate-100"
    );

  const renderTabs = () => (
    <div className="border-b border-slate-100">
      <ul className="flex flex-wrap">
        {statusList.map((status) => (
          <li className="mr-2" key={status}>
            <span
              onClick={() => setSearchParams({ status })}
              key={status}
              className={getClassName(status === currStatus)}
            >
              {status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col space-y-4">
      {renderHeader()}
      <QueueInfo />
      <div className="bg-white rounded">
        {renderTabs()}
        <JobList queueName={queue.name} status={currStatus} />
      </div>
    </div>
  );
}
