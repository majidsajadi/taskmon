import { useQueue } from "../../hooks/useQueue";
import { QueueDetail, QueueInfo } from "../../types";
import { Card, Descriptions } from "../base";
import { JobStatesChart } from "./JobStatesChart";
import { ProcessTimeChart } from "./ProcessTimeChart";

type QueueInfoProps = {
  queue: QueueDetail;
};

export function QueueInfo({ queue }: QueueInfoProps) {
  return (
    <div className="flex space-x-4">
      <div className="flex-1">
        <Card title="Redis">
          <Descriptions
            items={[
              { label: "Version", content: "6.0.6" },
              { label: "Mode", content: "standalone" },
              { label: "Used Memory", content: "1.21 MB" },
              { label: "Peak Used Memory", content: "1.23 MB" },
              { label: "Total Memory", content: "0 B" },
              { label: "Clients", content: "4" },
              { label: "Uptime", content: "96360 S" },
              { label: "Used CPU", content: "3.234692" },
            ]}
          />
        </Card>
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
