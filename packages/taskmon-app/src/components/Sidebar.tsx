import { FiExternalLink, FiGithub, FiSettings } from "react-icons/fi";
import { Button } from "./base";
import { QueueList } from "./queue/QueueList";

export function Sidebar() {
  return (
    <div className="flex flex-col justify-between h-full p-4 bg-white shadow-md w-72">
      <div className="flex-1">
        <div className="mb-6 text-center">
          <span className="text-xl font-bold tracking-wide text-gray-900 w-fit">
            TASKMON
          </span>
        </div>
        <QueueList />
      </div>
      <div className="flex-none">
        <ul className="flex flex-col space-y-3">
          <li>
            <Button
              type="link"
              size="small"
              icon={<FiSettings />}
              href="https://github.com/majidsajadi/taskmon"
            >
              Settings
            </Button>
          </li>
          <li>
            <Button
              type="link"
              size="small"
              icon={<FiGithub />}
              href="https://github.com/majidsajadi/taskmon"
            >
              Source code
            </Button>
          </li>
          <li>
            <Button
              type="link"
              size="small"
              icon={<FiExternalLink />}
              href="https://github.com/majidsajadi/taskmon/issues/new"
            >
              Open an issue
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
