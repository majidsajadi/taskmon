import { JobStatesChart } from "./JobStatesChart";
import { ProcessTimeChart } from "./ProcessTimeChart";
import { RedisClientInfo } from "./RedisClientInfo";
import { QueueDetail, QueueInfo } from "../../types";

type QueueInfoProps = {
  queue: QueueDetail;
};

export function QueueInfo({ queue }: QueueInfoProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <RedisClientInfo clientInfo={queue.clientInfo}/>
      </div>
      <div className="flex-1">
        <JobStatesChart counts={queue.counts} />
      </div>
      <div className="flex-none w-2/5">
        <ProcessTimeChart processTimes={queue.processTimes} />
      </div>
    </div>
  );
}
