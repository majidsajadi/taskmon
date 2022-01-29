import { useMemo } from "react";
import { DiscreteColorLegend, RadialChart } from "react-vis";
import { Card } from "../base";

type JobStatesChartProps = {
  counts?: Record<string, number>;
};

export function JobStatesChart({ counts }: JobStatesChartProps) {
  const data = useMemo(() => {
    return counts
      ? Object.entries(counts).map(([key, value]) => ({
          angle: value,
          label: key,
        }))
      : [];
  }, [counts]);

  console.log(data)

  const legends = useMemo(() => {
    return data.map((item) => item.label);
  }, [data]);

  return (
    <Card title="States">
      <div className="flex">
        <div className="flex-1">
          <RadialChart data={data} width={200} height={200} />
        </div>
        <DiscreteColorLegend items={legends} />
      </div>
    </Card>
  );
}
