import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { ProjectProvider, TasksProvider } from "../contexts";

function DashboardLayout() {
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  });
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  })

  const location = useLocation();

  const addProject = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const toggleComplete = (id, projectName) => {
    setProjects((prev) => prev.map((currProject) => (currProject.userId === id && currProject.name === projectName) ? {...currProject, completed: !currProject.completed} : currProject))
  }

  const deleteProject = (id, projectName) => {
    setProjects((prev) => prev.filter((currProject) => !(currProject.userId === id && currProject.name === projectName)))
  }

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addTasks = (task) => {
    setTasks((prev) => [task, ...prev]);
  }

  const toggleCompleteTask = (id) => {
    setTasks((prev) => prev.map((currTask) => currTask.taskId === id ? {...currTask, taskStatus: currTask.taskStatus} : currTask))
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((currTask) => currTask.taskId !== id))
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksProvider value={{tasks, addTasks, toggleCompleteTask, deleteTask}} >
      <ProjectProvider
        value={{ projects, addProject, toggleComplete, deleteProject }}
      >
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
    </TasksProvider>
  );
}

export default DashboardLayout;
