import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import {
  BookMarkProvider,
  ConnectionProvider,
  NotificationProvider,
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
  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
  });
  const [notifications, setNotification] = useState(() => {
    return JSON.parse(localStorage.getItem("notifications")) || [];
  });

  const location = useLocation();

  const addProject = (project) => {
    setProjects((prev) => [project, ...prev]);
  };

  const toggleComplete = (id, projectId) => {
    setProjects((prev) =>
      prev.map((currProject) =>
        currProject.userId === id && currProject.createdOn === projectId
          ? { ...currProject, completed: !currProject.completed }
          : currProject,
      ),
    );
  };

  const deleteProject = (id, projectId) => {
    setProjects((prev) =>
      prev.filter(
        (currProject) =>
          !(currProject.userId === id && currProject.createdOn === projectId),
      ),
    );
    setBookmarks((prev) =>
      prev.filter((project) => project.project !== projectId),
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
    setPendingRequest((prev) => [{ sender, receiver }, ...prev]);
  };

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
  };

  const addBookMark = (user, project) => {
    const exist = bookmarks.filter(
      (prev) => prev.user === user && prev.project === project,
    );

    if (exist.length > 0) return;
    setBookmarks((prev) => [{ user, project }, ...prev]);
  };

  const removeBookMark = (user, project) => {
    setBookmarks((prev) =>
      prev.filter(
        (currBookMark) =>
          !(currBookMark.user === user && currBookMark.project === project),
      ),
    );
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification) => {
    setNotification((prev) => [notification, ...prev]);
  }

  const removeNotification = (notiId) => {
    setNotification((prev) => prev.filter((notification) => notification.id !== notiId))
  }

  const modifyRead = (notiId) => {
    setNotification((prev) => prev.map((notification) => notification.id === notiId ? {...notification, read : true} : notification));
  }

  const modifyReadAll = (user) => {
    setNotification((prev) => prev.map((notification) => notification.to === user ? {...notification, read : true} : notification))
  }

  const deleteRead = (user) => {
    setNotification((prev) => prev.filter((notification) => !(notification.to === user && notification.read)))
  }

  return (
    <NotificationProvider
      value={{
        notifications,
        addNotification,
        removeNotification,
        modifyRead,
        modifyReadAll,
        deleteRead
      }}
    >
      <BookMarkProvider value={{ bookmarks, addBookMark, removeBookMark }}>
        <ConnectionProvider
          value={{
            connections,
            pendingRequest,
            addRequest,
            deleteRequest,
            addConnection,
            deleteConnection,
          }}
        >
          <TasksProvider
            value={{ tasks, addTasks, toggleCompleteTask, deleteTask }}
          >
            <ProjectProvider
              value={{ projects, addProject, toggleComplete, deleteProject }}
            >
              <div className="h-screen flex flex-col">
                <Header type="dashNav" />
                {location.pathname === "/profile" ? (
                  <main>
                    <Outlet />
                  </main>
                ) : (
                  <div className={`flex w-full h-full flex-1 overflow-hidden`}>
                    <aside className="lg:w-1/6 hidden lg:block overflow-y-auto">
                      <SideBar />
                    </aside>
                    <main className="lg:w-5/6 w-full flex-1 overflow-y-auto">
                      <Outlet />
                    </main>
                  </div>
                )}
              </div>
            </ProjectProvider>
          </TasksProvider>
        </ConnectionProvider>
      </BookMarkProvider>
    </NotificationProvider>
  );
}

export default DashboardLayout;
