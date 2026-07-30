import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

function DashboardLayout() {
  const location = useLocation()
  return (
    <div className="h-screen flex flex-col">
      <Header type="dashNav" />

      <main
        className={`flex-1 ${location.pathname === "/profile" ? "block" : "hidden"}`}
      >
        <Outlet />
      </main>
      <div
        className={`flex w-full h-full flex-1 ${location.pathname !== "/profile" ? "block" : "hidden"} overflow-hidden`}
      >
        <aside className="w-1/6 overflow-y-auto">
          <SideBar />
        </aside>
        <main className="w-5/6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
