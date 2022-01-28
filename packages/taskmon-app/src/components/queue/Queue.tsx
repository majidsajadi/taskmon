import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { FiPause, FiPlay } from "react-icons/fi";
import classNames from "classnames";
import { Button, Loading } from "../base";
import { JobList } from "../job/JobList";
import { JobStatus } from "../../types";
import { QueueInfo } from "./QueueInfo";
import { useQueue } from "../../hooks/useQueue";

export function Queue() {
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const statusList = Object.values(JobStatus);
  const queueName = params.queueName;

  const { data: queue, status } = useQueue(queueName);

  const currStatus = useMemo(
    () => searchParams.get("status") || "",
    [searchParams]
  );

  useEffect(() => {
    if (!currStatus) {
      setSearchParams({ status: JobStatus.COMPLETED });
    }
  }, [currStatus]);

  const getClassName = (active: boolean) =>
    classNames(
      "inline-block py-4 px-4 cursor-pointer font-medium text-center border-b-2",
      active
        ? "border-teal-600 text-teal-600"
        : " border-transparent hover:border-slate-100"
    );

  if (status === "loading" || status === "idle") {
    return <Loading />;
  }
  if (!queue) return <div>not found</div>;

  return (
    <div className="flex flex-col p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{queueName}</h3>
        <div className="flex space-x-2">
          {queue?.paused ? (
            <Button icon={<FiPlay className="text-lg" />}>RESUME</Button>
          ) : (
            <Button icon={<FiPause className="text-lg" />}>PAUSE</Button>
          )}
          <Button type="primary">NEW JOB</Button>
        </div>
      </div>
      <QueueInfo />
      <div className="bg-white rounded">
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
        <JobList queueName={queue?.name} status={currStatus} />
      </div>
    </div>
  );
}
