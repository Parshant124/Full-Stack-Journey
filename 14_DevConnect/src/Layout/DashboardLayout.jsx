import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { ProjectProvider } from "../contexts";

function DashboardLayout() {
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  });
  const location = useLocation();

  const addProject = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  return (
    <ProjectProvider value={{ projects, addProject }}>
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
    </ProjectProvider>
  );
}

export default DashboardLayout;
