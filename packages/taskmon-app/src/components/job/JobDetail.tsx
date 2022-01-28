import { useMemo } from "react";
import { Editor, Tabs } from "../base";
import { Job } from "../../types";
import Utils from "../../utils";

type JobDetailProps = {
  job: Job;
};

export function JobDetail({ job }: JobDetailProps) {
  const tabItems = useMemo(() => {
    const result = [];

    if (job.data) {
      result.push({
        label: "Data",
        content: (
          <Editor readonly value={Utils.formatCode(job.data)} lang="json" />
        ),
      });
    }

    if (job.opts) {
      result.push({
        label: "Options",
        content: (
          <Editor readonly value={Utils.formatCode(job.opts)} lang="json" />
        ),
      });
    }

    if (job.stacktrace.length) {
      result.push({
        label: "Stacktrace",
        content: <Editor readonly value={job.stacktrace.join("\n")} />,
      });
    }

    return result;
  }, [job]);

  return <Tabs items={tabItems} />;
}
