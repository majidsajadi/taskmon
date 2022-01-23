import { useEffect } from "react";
import useReq from "use-req";
import client from "../../client";
import usePagination from "../../hooks/usePagination";
import { Job } from "./Job";
import { JobListPagination } from "./JobListPagination";

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

  const renderTitle = () => (
    <div className="px-4 py-2 border-b">
      <div className="flex items-center space-x-6 font-medium">
        <div className="w-3" />
        <div className="flex space-x-6 grow">
          <div className="flex-none w-16 truncate">Id</div>
          <div className="truncate grow">Name</div>
          <div className="flex-none w-32 truncate">Status</div>
          <div className="flex-none truncate w-36">Added At</div>
          <div className="flex-none truncate w-36">Processed On</div>
          <div className="flex-none truncate w-36">Finished On</div>
          <div className="flex-none truncate w-44">Progress</div>
        </div>
        <div className="w-10" />
      </div>
    </div>
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-4">
      {renderTitle()}
      <div>
        {data?.jobs.map((job) => (
          <Job   job={job} status={status} />
        ))}
      </div>
      <JobListPagination />
    </div>
  );
}
