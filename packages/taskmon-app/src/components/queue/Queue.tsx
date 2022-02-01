import { useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Loading } from "../base";
import { JobStatus } from "../../types";
import { useQueue } from "../../hooks/useQueue";
import { JobList } from "../job/JobList";
import { QueueHeader } from "./QueueHeader";
import { QueueInfo } from "./QueueInfo";
import { QueueStateTabs } from "./QueueStateTabs";

export function Queue() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const queueName = params.queueName;

  const { data: queue, status } = useQueue(queueName);

  const currentState = useMemo((): JobStatus | undefined => {
    const status = searchParams.get("status") as JobStatus;

    if (Object.values(JobStatus).includes(status)) {
      return status as JobStatus;
    }

    return undefined;
  }, [searchParams]);

  const count = useMemo(
    () => currentState && queue?.counts[currentState],
    [currentState, queue]
  );

  useEffect(() => {
    if (!currentState) {
      setSearchParams({ status: JobStatus.COMPLETED });
    }
  }, [currentState]);

  if (status === "loading" || status === "idle") {
    return <Loading />;
  }

  if (!queue) {
    navigate("/oh-no");
    return <div></div>;
  }

  return (
    <div className="flex flex-col p-6 space-y-4">
      <QueueHeader queueName={queue.name} paused={queue.paused} />
      <QueueInfo queue={queue} />
      <div className="bg-white rounded-md shadow-md">
        <QueueStateTabs currentState={currentState} counts={queue?.counts} />
        <JobList queueName={queue?.name} status={currentState} count={count} />
      </div>
    </div>
  );
}
