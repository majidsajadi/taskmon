import { Link } from "react-router-dom";

export function Error() {
  return (
    <div className="flex flex-col items-center p-12 space-y-4 text-center">
      <h1 className="text-6xl font-bold">500</h1>
      <p className="text-3xl font-bold">Unexpected Error</p>
      <p className="text-lg">Seems like an unexpected error accured :(</p>
      <p className="text-lg">
        Please open a{" "}
        <a
          className="font-medium text-teal-600"
          href="https://github.com/majidsajadi/taskmon/issues/new"
        >
          Github issue
        </a>{" "}
        to help us fix this problem
      </p>
      <Link
        to="/"
        className="px-4 py-2 font-medium text-white uppercase bg-teal-600 rounded-md w-fit"
      >
        Take me home
      </Link>
    </div>
  );
}
