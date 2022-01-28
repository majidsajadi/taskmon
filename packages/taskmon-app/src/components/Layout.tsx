import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="h-full bg-slate-100">
      <div className="flex h-full divide-x">
        <Sidebar />
        <div className="h-full overflow-auto grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
