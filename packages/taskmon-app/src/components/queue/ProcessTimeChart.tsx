import { useMemo } from "react";
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalBarSeries,
  FlexibleWidthXYPlot,
} from "react-vis";

export function ProcessTimeChart() {
  const processTime = [
    { x: "Min", y: 5 },
    { x: "Median", y: 10 },
    { x: "Max", y: 5456456546546 },
  ];


  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="mb-4 font-bold tracking-wider uppercase">
        Process time
      </div>
      <div className="flex">
        <FlexibleWidthXYPlot xType="ordinal" height={200} margin={{ left: 48 }}>
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickSize={0} tickFormat={(x) => x} />
          <VerticalBarSeries barWidth={0.5} data={processTime} />
        </FlexibleWidthXYPlot>
      </div>
    </div>
  );
}
