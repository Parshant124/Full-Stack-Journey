import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import {
  ConnectionProvider,
  ProjectProvider,
  TasksProvider,
} from "../contexts";

function DashboardLayout() {
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  });
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [connections, setConnections] = useState(() => {
    return JSON.parse(localStorage.getItem("connections")) || [];
  });
  const [pendingRequest, setPendingRequest] = useState(() => {
    return JSON.parse(localStorage.getItem("requests")) || [];
  });

  const location = useLocation();

  const addProject = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const toggleComplete = (id, projectName) => {
    setProjects((prev) =>
      prev.map((currProject) =>
        currProject.userId === id && currProject.name === projectName
          ? { ...currProject, completed: !currProject.completed }
          : currProject,
      ),
    );
  };

  const deleteProject = (id, projectName) => {
    setProjects((prev) =>
      prev.filter(
        (currProject) =>
          !(currProject.userId === id && currProject.name === projectName),
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addTasks = (task) => {
    setTasks((prev) => [task, ...prev]);
  };

  const toggleCompleteTask = (id) => {
    setTasks((prev) =>
      prev.map((currTask) =>
        currTask.taskId === id
          ? { ...currTask, completed: !currTask.completed }
          : currTask,
      ),
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((currTask) => currTask.taskId !== id));
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addConnection = (senderId, receiverId) => {
    setConnections((prev) => [{ senderId, receiverId }, ...prev]);
  };

  const deleteConnection = (senderId, receiverId) => {
    setConnections((prev) =>
      prev.filter(
        (currConnection) =>
          !(
            (currConnection.senderId === senderId &&
              currConnection.receiverId === receiverId) ||
            (currConnection.receiverId === senderId &&
              currConnection.senderId === receiverId)
          ),
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("connections", JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(pendingRequest));
  }, [pendingRequest]);

  const addRequest = (sender, receiver) => {
    setPendingRequest((prev) => [{sender, receiver}, ...prev])
  }

  const deleteRequest = (sender, receiver) => {
    setPendingRequest((prev) =>
      prev.filter(
        (curr) =>
          !(
            (curr.sender === sender && curr.receiver === receiver) ||
            (curr.sender === receiver && curr.receiver === sender)
          ),
      ),
    );
  }

  return (
    <ConnectionProvider
      value={{ connections, pendingRequest, addRequest, deleteRequest, addConnection, deleteConnection }}
    >
      <TasksProvider
        value={{ tasks, addTasks, toggleCompleteTask, deleteTask }}
      >
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
    </ConnectionProvider>
  );
}

export default DashboardLayout;
