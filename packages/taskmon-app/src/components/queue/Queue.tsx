import { useContext, useEffect, useMemo } from "react";
import classNames from "classnames";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FiPause } from "react-icons/fi";
import { Button } from "../base";
import { JobList } from "../job/JobList";
import { AppContext } from "../../context/App";
import { JobStatus } from "../../types";

export function Queue() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { selectQueue } = useContext(AppContext);

  const statusList = Object.values(JobStatus)
  const queueName = params.queueName;
  const queue = selectQueue?.(queueName || "");

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

  }, [currStatus]);
  
  const getClassName = (active: boolean) =>
    classNames(
      // "pb-2 mr-8 font-medium cursor-pointer",
      "block w-full px-6 py-3 my-2 text-sm font-medium uppercase border-t-0 border-b-2 border-x-0 cursor-pointer",
      active ? "border-teal-600 text-teal-600" : "border-slate-100"
    );

  const renderHeader = () => (
    <div className="flex items-center justify-between">
      <h3 className="text-2xl font-bold">{queueName}</h3>
      <div className="flex space-x-2">
        <Button icon={<FiPause className="text-lg" />}>PAUSE</Button>
        <Button type="primary">NEW JOB</Button>
      </div>
    </div>
  );

  const renderTabs = () => (
    <ul className="flex flex-wrap my-4 list-none border-b-0">
      {statusList.map((status) => (
        <li className="flex-grow text-center nav-item" key={status}>
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
  );

  return (
    <div>
      {renderHeader()}
      {renderTabs()}
      <JobList queueName={queue.name} status={currStatus} />
    </div>
  );
}
