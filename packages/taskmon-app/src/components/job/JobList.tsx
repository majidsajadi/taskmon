import { useMemo } from "react";
import {
  FiMinusSquare,
  FiPlusSquare,
  FiRepeat,
  FiTrash2,
} from "react-icons/fi";
import { JobListPagination } from "./JobListPagination";
import { Button, Progress, Table, Tooltip } from "../base";
import { Job, JobStatus } from "../../types";
import Utils from "../../utils";
import { JobDetail } from "./JobDetail";
import { useJobs } from "../../hooks/useJobs";
import { useDeleteJob } from "../../hooks/useDeleteJob";
import { useRetryJob } from "../../hooks/useRetryJob";
import { usePromoteJob } from "../../hooks/usePromoteJob";

type JobListProps = {
  queueName: string;
  status?: JobStatus;
  count?: number;
};

export function JobList({ status, queueName, count }: JobListProps) {
  const { isFetching, data } = useJobs(queueName, status);
  const deleteJob = useDeleteJob();
  const retryJob = useRetryJob();
  const promoteJob = usePromoteJob();

  const handlePromoteJob = (jobId: string) => {
    promoteJob.mutate({ queueName, jobId });
  };

  const handleDeleteJob = (jobId: string) => {
    deleteJob.mutate({ queueName, jobId });
  };

  const handleRetryJob = (jobId: string) => {
    retryJob.mutate({ queueName, jobId });
  };

  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }: any) => (
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? (
              <Button type="link" size="small" icon={<FiMinusSquare />} />
            ) : (
              <Button type="link" size="small" icon={<FiPlusSquare />} />
            )}
          </span>
        ),
      },
      { Header: "Id", accessor: (row: Job) => row.id },
      { Header: "Name", accessor: (row: Job) => row.name },
      {
        Header: "Progress",
        accessor: (row: Job) => <Progress percent={row.progress} />,
      },
      {
        Header: "Attempts",
        accessor: (row: Job) => row.attemptsMade,
      },
      {
        Header: "Added At",
        accessor: (row: Job) => (
          <Tooltip content={Utils.fromNow(row.timestamp) || ""}>
            {Utils.formatDate(row.timestamp)}
          </Tooltip>
        ),
      },
      {
        Header: "Processed On",
        accessor: (row: Job) => (
          <Tooltip content={Utils.fromNow(row.processedOn) || ""}>
            {Utils.formatDate(row.processedOn)}
          </Tooltip>
        ),
      },
      {
        Header: "Finished On",
        accessor: (row: Job) => (
          <Tooltip content={Utils.fromNow(row.finishedOn) || ""}>
            {Utils.formatDate(row.finishedOn)}
          </Tooltip>
        ),
      },
      {
        Header: "Actions",
        accessor: (row: Job) => (
          <div className="flex items-center space-x-4">
            <Tooltip content="Delete Job">
              <Button
                className="align-sub"
                type="link"
                size="small"
                onClick={() => handleDeleteJob(row.id)}
                icon={<FiTrash2 className="text-lg text-red-500" />}
              />
            </Tooltip>
            {status === JobStatus.FAILED && (
              <Tooltip content="Retry Job">
                <Button
                  className="align-sub"
                  type="link"
                  size="small"
                  onClick={() => handleRetryJob(row.id)}
                  icon={<FiRepeat className="text-lg text-teal-600" />}
                />
              </Tooltip>
            )}
            {status === JobStatus.FAILED && (
              <Tooltip content="Retry Job">
                <Button
                  className="align-sub"
                  type="link"
                  size="small"
                  onClick={() => handlePromoteJob(row.id)}
                  icon={<FiRepeat className="text-lg text-teal-600" />}
                />
              </Tooltip>
            )}
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="mt-4">
      <Table<Job>
        data={data || []}
        loading={isFetching}
        columns={columns}
        renderRowSubComponent={(row) => <JobDetail job={row.original} />}
      />
      {/* TODO: use react-table pagination */}
      <JobListPagination totalCount={count} />
    </div>
  );
}
