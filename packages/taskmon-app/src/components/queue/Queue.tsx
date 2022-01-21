import { useMemo } from "react";
import classNames from "classnames";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FiPause } from "react-icons/fi";
import { Button } from "../base";
import { JobList } from "../job/JobList";

const statusList = [
  "Latest",
  "Active",
  "Waiting",
  "Completed",
  "Failed",
  "Delayed",
  "Paused",
];

export function Queue() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const queueName = params.queueName;

  const currStatus = useMemo(
    () => searchParams.get("status") || "",
    [searchParams]
  );

  // TODO: handle queue not found
  if (!queueName) {
    navigate("/error");
    return <div></div>;
  }

  const getClassName = (active: boolean) =>
    classNames(
      "pb-2 mr-8 font-medium cursor-pointer",
      active ? "border-b-2 border-teal-600 text-teal-600" : "text-slate-400"
    );

  const renderHeader = () => (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold">{queueName}</h3>
      <div className="flex space-x-2">
        <Button type="link">Reload</Button>
        <Button icon={<FiPause className="text-lg" />}>PAUSE</Button>
        <Button type="primary">NEW JOB</Button>
      </div>
    </div>
  );

  return (
    <div>
      {renderHeader()}
      <div className="mt-4 pb-2 border-b">
        {statusList.map((status) => (
          <span
            onClick={() => setSearchParams({ status })}
            key={status}
            className={getClassName(status === currStatus)}
          >
            {status}
          </span>
        ))}
      </div>
      <JobList queueName={queueName} status={currStatus} />
    </div>
  );
}
