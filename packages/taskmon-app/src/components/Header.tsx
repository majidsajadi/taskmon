import { FiGithub, FiSettings } from "react-icons/fi";

export function Header() {
  return (
    <div className="fixed inset-x-0 top-0 flex-none h-12 px-6 py-2 bg-white border-b">
      <div className="flex items-center justify-between">
        <div className="px-2 py-1 font-bold tracking-wide text-black">
          <span>TASKMAN</span>
        </div>
        <div className="flex items-center space-x-4">
          <FiSettings className="text-lg" />
          <FiGithub className="text-lg" />
        </div>
      </div>
    </div>
  );
}
