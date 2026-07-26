import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header type="authNav"/>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
