import { useMemo } from "react";
import { DiscreteColorLegend, RadialChart } from "react-vis";
import { JobStatus } from "../../types";
import { Card } from "../base";
import Utils from "../../utils";

type JobStatesChartProps = {
  counts?: Record<JobStatus, number>;
};

export function JobStatesChart({ counts }: JobStatesChartProps) {
  const [data, legends] = useMemo(() => {
    const data = counts
      ? Object.entries(counts).map(([key, value]) => ({
          angle: value,
          label: key as JobStatus,
          color: Utils.getStateColor(key as JobStatus),
        }))
      : [];

    const legends = data.map((item) => ({
      title: Utils.capitalize(item.label),
      color: item.color,
    }));

    return [data, legends];
  }, [counts]);

  return (
    <Card title="States">
      <div className="flex">
        <div className="flex-1">
          <RadialChart
            colorType="literal"
            data={data}
            width={200}
            height={200}
          />
        </div>
        <DiscreteColorLegend items={legends} height={200} />
      </div>
    </Card>
  );
}
