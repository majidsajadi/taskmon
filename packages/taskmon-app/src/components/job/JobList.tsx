import { useEffect } from "react";
import { FiRepeat, FiTrash2 } from "react-icons/fi";
import useReq from "use-req";
import { JobListPagination } from "./JobListPagination";
import { JobDetail } from "./JobDetail";
import { Button, Progress, Table, Tooltip } from "../base";
import { Job } from "../../types";
import client from "../../client";
import Utils from "../../utils";
import usePagination from "../../hooks/usePagination";

type JobListProps = {
  queueName: string;
  // TODO: use JobStatus enum
  status: string;
};

export function JobList({ status, queueName }: JobListProps) {
  const { page, pageSize } = usePagination();

  const {
    run: fetchJobs,
    loading,
    data,
  } = useReq(client.job.list, {
    deps: [queueName, status, page, pageSize],
    immediate: false,
  });

  const columns = [
    { label: "Id", accessor: (row: Job) => row.id },
    { label: "Name", accessor: (row: Job) => row.name },
    {
      label: "Progress",
      accessor: (row: Job) => <Progress percent={row.progress} />,
    },
    {
      label: "Added At",
      accessor: (row: Job) => (
        <Tooltip content={Utils.fromNow(row.processedOn) || ""}>
          {Utils.formatDate(row.processedOn)}
        </Tooltip>
      ),
    },
    {
      label: "Processed On",
      accessor: (row: Job) => (
        <Tooltip content={Utils.fromNow(row.processedOn) || ""}>
          {Utils.formatDate(row.processedOn)}
        </Tooltip>
      ),
    },
    {
      label: "Finished On",
      accessor: (row: Job) => (
        <Tooltip content={Utils.fromNow(row.finishedOn) || ""}>
          {Utils.formatDate(row.finishedOn)}
        </Tooltip>
      ),
    },
    {
      label: "Actions",
      accessor: () => (
        <div className="flex items-center space-x-4">
          <Tooltip content="Delete Job">
            <Button
              className="align-sub"
              type="link"
              size="small"
              icon={<FiTrash2 className="text-lg text-red-500" />}
            />
          </Tooltip>
          <Tooltip content="Retry Job">
            <Button
              className="align-sub"
              type="link"
              size="small"
              icon={<FiRepeat className="text-lg text-teal-600" />}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (status) {
      const query = {
        page,
        pageSize,
        type: status,
      };
      fetchJobs(queueName, query);
    }
  }, [fetchJobs]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="mt-4">
      <Table
        expandedRowRender={(job: Job) => <JobDetail job={job} />}
        rows={data?.jobs || []}
        columns={columns}
        rowKey="id"
      />
      <JobListPagination />
    </div>
  );
}
