import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import SideBar from "./components/SideBar/SideBar";

export default function Layout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1 bg-gray-50 shadow-lg overflow-hidden">
        <TopBar />
        <div className="flex flex-1">
          <SideBar />
          <main className=" flex-1 bg-white rounded-2xl shadow-md p-4 overflow-y-auto m-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
