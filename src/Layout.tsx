import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <TopBar />

      <div className="flex flex-1 min-h-0">
        <SideBar />

        <main className="flex-1 min-h-0 min-w-0 p-4">
          <div className="h-full bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
