import { useEffect, useMemo } from "react";
import {
  FiMinusSquare,
  FiPlusSquare,
  FiRepeat,
  FiTrash2,
} from "react-icons/fi";
import useReq from "use-req";
import { JobListPagination } from "./JobListPagination";
import { Button, Progress, Table, Tooltip } from "../base";
import { Job } from "../../types";
import client from "../../client";
import Utils from "../../utils";
import usePagination from "../../hooks/usePagination";
import { JobDetail } from "./JobDetail";

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
    ],
    []
  );

  const rows = useMemo(() => data?.jobs || [], [data]);

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
      <Table<Job>
        data={rows}
        columns={columns}
        renderRowSubComponent={(row) => <JobDetail job={row.original} />}
      />
      {/* TODO: use react-table pagination */}
      <JobListPagination />
    </div>
  );
}
