import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalBarSeries,
  FlexibleWidthXYPlot,
} from "react-vis";
import { Card } from "../base";

export function ProcessTimeChart() {
  const processTime = [
    { x: "Min", y: 5 },
    { x: "Median", y: 10 },
    { x: "Max", y: 5456456546546 },
  ];

  return (
    <Card title="Process time">
      <div className="flex">
        <FlexibleWidthXYPlot xType="ordinal" height={200} margin={{ left: 48 }}>
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickSize={0} tickFormat={(x) => x} />
          <VerticalBarSeries barWidth={0.5} data={processTime} />
        </FlexibleWidthXYPlot>
      </div>
    </Card>
  );
}
