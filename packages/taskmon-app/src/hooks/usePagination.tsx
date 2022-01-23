import { useSearchParams } from "react-router-dom";

type UsePaginationReturn = {
  page: number;
  pageSize: number;
  next: () => void;
  prev: () => void;
};

const PAGE_SIZE = 10;

export default function (totalCount = 0): UsePaginationReturn {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = Number(pageParam) || 1;

  const isFirstPage = page <= 1;
  const isLastPage = page * PAGE_SIZE >= totalCount;

  const next = () => {
    if (!isLastPage) {
      setSearchParams({
        page: String(page + 1),
      });
    }
  };

  const prev = () => {
    if (!isFirstPage) {
      setSearchParams({
        page: String(page - 1),
      });
    }
  };

  return { prev, next, page, pageSize: PAGE_SIZE };
}
