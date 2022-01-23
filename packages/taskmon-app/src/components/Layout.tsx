import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { QueueList } from "./queue/QueueList";

export function Layout() {
  return (
    <div>
      <Header />
      <div className="h-screen pt-12">
        <div className="flex h-full divide-x">
          <div className="p-3 w-72">
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
