import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="dashNav" />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
