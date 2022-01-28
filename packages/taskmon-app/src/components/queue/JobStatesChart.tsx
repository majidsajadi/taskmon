import { DiscreteColorLegend, RadialChart } from "react-vis";

export function JobStatesChart() {
  const myData = [{ angle: 1 }, { angle: 5 }, { angle: 2 }];

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="mb-4 font-bold tracking-wider uppercase">States</div>
      <div className="flex">
        <div className="flex-1">
      <RadialChart data={myData} width={200} height={200} />

        </div>
        <DiscreteColorLegend items={["Majid", "sajadi"]}/>
      </div>
    </div>
  );
}
