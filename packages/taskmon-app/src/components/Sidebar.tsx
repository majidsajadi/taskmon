import { FiExternalLink, FiGithub, FiSettings } from "react-icons/fi";
import { QueueList } from "./queue/QueueList";

export function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-full p-4 bg-white shadow-lg w-72">
      <div className="flex-1">
        <div className="mb-6 text-center">
          <span className="px-2 py-1 text-xl font-bold tracking-wide rounded text-slate-900 w-fit">
            TASKMON
          </span>
        </div>
        <QueueList />
      </div>
      <div className="flex-none">
        <ul className="flex flex-col space-y-2">
          <li className="flex items-center space-x-4">
            <FiSettings />
            <span className="text-sm">Settings</span>
          </li>
          <li className="flex items-center space-x-4">
            <FiGithub />
            <a
              className="text-sm"
              href="https://github.com/majidsajadi/taskmon"
            >
              Source code
            </a>
          </li>
          <li className="flex items-center space-x-4">
            <FiExternalLink />
            <a
              className="text-sm"
              href="https://github.com/majidsajadi/taskmon/issues/new"
            >
              Open an issue
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
