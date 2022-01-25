import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { QueueList } from "./queue/QueueList";

export function Layout() {
  return (
    <div className="bg-gray-100">
      {/* <Header /> */}
      <div className="h-screen">
        <div className="flex h-full divide-x">
          <div className="flex flex-col p-3 space-y-8 bg-white w-72">
            <div className="font-bold tracking-wide">
              <div className="px-2 py-1 rounded text-slate-100 bg-slate-900 w-fit">
                <span>TASKMAN</span>
              </div>
            </div>
            <QueueList />
          </div>
          <div className="h-full p-6 overflow-auto grow">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
