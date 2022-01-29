import { useMemo } from "react";
import {
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalBarSeries,
  FlexibleWidthXYPlot,
} from "react-vis";
import { ProcessTimes } from "../../types";
import Utils from "../../utils";
import { Card } from "../base";

type ProcessTimeChartProps = {
  processTimes: ProcessTimes;
};

export function ProcessTimeChart({ processTimes }: ProcessTimeChartProps) {
  const data = useMemo(() => {
    return Object.entries(processTimes).map(([key, value]) => {
      return { x: Utils.capitalize(key), y: value };
    });
  }, [processTimes]);

  return (
    <Card title="Process time">
      <div className="flex">
        <FlexibleWidthXYPlot xType="ordinal" height={200} margin={{ left: 48 }}>
          <HorizontalGridLines />
          <XAxis />
          <YAxis tickSize={0} tickFormat={(x) => x} />
          <VerticalBarSeries barWidth={0.5} data={data} />
        </FlexibleWidthXYPlot>
      </div>
    </Card>
  );
}
