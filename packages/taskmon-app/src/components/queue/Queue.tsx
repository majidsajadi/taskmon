import { useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FiPause, FiPlay, FiRefreshCw, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import classNames from "classnames";
import { Button, Loading, Tooltip } from "../base";
import { JobList } from "../job/JobList";
import { JobStatus } from "../../types";
import { QueueInfo } from "./QueueInfo";
import { useQueue } from "../../hooks/useQueue";
import { useQueryClient } from "react-query";
import { usePauseQueue } from "../../hooks/usePauseQueue";
import { useDestroyQueue } from "../../hooks/useDestroyQueue";

export function Queue() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const statusList = Object.values(JobStatus);
  const queueName = params.queueName;

  const { data: queue, status } = useQueue(queueName);
  const pauseQueue = usePauseQueue();
  const destroyQueue = useDestroyQueue();

  const currStatus = useMemo((): JobStatus | undefined => {
    const status = searchParams.get("status") as JobStatus;

    if (Object.values(JobStatus).includes(status)) {
      return status as JobStatus;
    }

    return undefined;
  }, [searchParams]);

  const count = useMemo(
    () => currStatus && queue?.counts[currStatus],
    [currStatus, queue]
  );

  useEffect(() => {
    if (!currStatus) {
      setSearchParams({ status: JobStatus.COMPLETED });
    }
  }, [currStatus]);

  const handleRefresh = () => {
    queryClient.invalidateQueries("jobs");
  };

  const handlePause = () => {
    if (queueName) {
      pauseQueue.mutate(queueName);
      toast(`Paused queue ${queueName}`);
    }
  };

  const handleDestroy = () => {
    if (queueName) {
      destroyQueue.mutate(queueName);
      toast(`Destroyed queue ${queueName}`);
      navigate("/");
    }
  };

  const getClassName = (active: boolean) =>
    classNames(
      "inline-block py-4 px-4 cursor-pointer font-medium text-center border-b-2 flex space-x-2 uppercase text-sm",
      active
        ? "border-teal-600 text-teal-600"
        : " border-transparent hover:border-slate-100"
    );

  if (status === "loading" || status === "idle") {
    return <Loading />;
  }

  if (!queue) {
    navigate("/oh-no");
    return <div></div>;
  }

  return (
    <div className="flex flex-col p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">{queueName}</h3>
        <div className="flex space-x-2">
          <Button
            onClick={handlePause}
            icon={
              queue?.paused ? (
                <FiPlay className="text-lg" />
              ) : (
                <FiPause className="text-lg" />
              )
            }
          >
            {queue?.paused ? "Resume" : "Pause"}
          </Button>
          <Button type="danger" onClick={handleDestroy} icon={<FiTrash2 />}>
            Destroy
          </Button>
          <Button type="primary">New Job</Button>
        </div>
      </div>
      <QueueInfo queue={queue} />
      <div className="bg-white rounded shadow">
        <div className="flex items-center justify-between border-b border-slate-100">
          <ul className="flex flex-wrap">
            {statusList.map((status) => (
              <li className="mr-2" key={status}>
                <div
                  onClick={() => setSearchParams({ status })}
                  key={status}
                  className={getClassName(status === currStatus)}
                >
                  <span>{status}</span>
                  <span>{queue?.counts[status]}</span>
                </div>
              </li>
            ))}
          </ul>
          <div className="mx-4">
            <Tooltip content="Refresh">
              <Button
                onClick={handleRefresh}
                type="link"
                icon={<FiRefreshCw />}
              />
            </Tooltip>
          </div>
        </div>
        <JobList queueName={queue?.name} status={currStatus} count={count} />
      </div>
    </div>
  );
}
