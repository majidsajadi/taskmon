import { Link } from "react-router-dom";

export function NoMatch() {
  return (
    <div className="flex flex-col items-center p-12 space-y-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-3xl font-bold">Got Lost?</p>
      <p className="text-lg">Page not found :(</p>
      <Link
        to="/"
        className="px-4 py-2 font-medium text-white uppercase bg-teal-600 rounded-md w-fit"
      >
        Take me home
      </Link>
    </div>
  );
}
