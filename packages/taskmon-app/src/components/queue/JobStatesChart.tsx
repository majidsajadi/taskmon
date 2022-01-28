import { DiscreteColorLegend, RadialChart } from "react-vis";
import { Card } from "../base";

export function JobStatesChart() {
  const myData = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];

  return (
    <Card title="States">
      <div className="flex">
        <div className="flex-1">
          <RadialChart data={myData} width={200} height={200} />
        </div>
        <DiscreteColorLegend items={["Majid", "sajadi"]} />
      </div>
    </Card>
  );
}
