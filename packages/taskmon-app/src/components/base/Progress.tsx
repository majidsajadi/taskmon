import { useMemo } from "react";

type ProgressProps = {
  percent: string | number;
};

export function Progress({ percent }: ProgressProps) {
  const calculated = useMemo(() => {
    return percent <= 100 ? percent : 100;
  }, [percent]);

  return (
    <div className="flex items-center space-x-2">
      <div className="w-full h-3 rounded bg-slate-100">
        <div
          className="h-full bg-teal-600 rounded"
          style={{
            width: `${calculated}%`,
          }}
        ></div>
      </div>
      <span>{calculated}%</span>
    </div>
  );
}
