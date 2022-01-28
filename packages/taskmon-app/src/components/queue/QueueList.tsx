import classNames from "classnames";
import { matchPath, useLocation, Link, useNavigate } from "react-router-dom";
import { ChangeEventHandler, useContext, useEffect, useMemo } from "react";
import { AppContext } from "../../context/App";
import { FiRefreshCw } from "react-icons/fi";
import { Button } from "../base";
import { useState } from "react";

export function QueueList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const { queues, queueLoading, fetchQueues } = useContext(AppContext);

  const filtered = useMemo(() => {
    if (filter) {
      return queues?.filter((queue) => queue.name.includes(filter));
    }

    return queues;
  }, [filter, queues]);

  useEffect(() => {
    const isRoot = matchPath("/", location.pathname);

    if (queues?.length && isRoot) {
      const to = `/queues/${queues[0].name}`;
      navigate(to);
    }
  }, [queues, location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleRefresh = () => {
    fetchQueues?.();
  };

  const getLinkCLS = (match: boolean) =>
    classNames(
      "hover:bg-slate-100 w-full rounded px-4 py-2 block truncate space-x-2 flex justify-between",
      match && "bg-slate-100"
    );

  if (queueLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex-none">
      <h3 className="mb-2 font-medium tracking-wider uppercase">Queues</h3>
      <div className="flex w-full mb-2">
        <input
          type="text"
          className="flex-1 block border rounded"
          value={filter}
          onChange={handleChange}
        />
        <Button type="link" icon={<FiRefreshCw />} onClick={handleRefresh} />
      </div>
      {filtered?.map((queue) => {
        const to = `/queues/${queue.name}`;
        const match = matchPath(to, location.pathname) ?? false;
        // TODO: generate id here
        return (
          <Link className={getLinkCLS(!!match)} key={queue.name} to={to}>
            <span>{queue.name}</span>
            <span className="text-teal-600">{queue.totalCount}</span>
          </Link>
        );
      })}
    </div>
  );
}
