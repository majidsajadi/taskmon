import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Button } from "../base";
import usePagination from "../../hooks/usePagination";

export function JobListPagination() {
  const totalCount = 100;
  const { page, pageSize, next, prev } = usePagination(totalCount);

  const from = page * pageSize - 9;
  const to = page * pageSize > totalCount ? totalCount : page * pageSize;
  const isFirstPage = page <= 1;
  const isLastPage = page * pageSize >= totalCount;

  return (
    <div className="flex flex-row-reverse p-4">
      <div className="flex items-center">
        <span className="mr-3">
          From{" "}
          <span className="font-semibold">
            {from} to {to}
          </span>{" "}
          of total{" "}
          <span className="font-semibold">{totalCount}</span>
        </span>
        <Button
          onClick={prev}
          disabled={isFirstPage}
          type="link"
          size="small"
          icon={<FiChevronLeft className="text-xl" />}
        />
        <Button
          onClick={next}
          disabled={isLastPage}
          type="link"
          size="small"
          icon={<FiChevronRight className="text-xl" />}
        />
      </div>
    </div>
  );
}
