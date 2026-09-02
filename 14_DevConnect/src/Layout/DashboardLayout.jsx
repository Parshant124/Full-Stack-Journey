import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [connections, setConnections] = useState([]);
  const [pendingRequest, setPendingRequest] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [notifications, setNotification] = useState([]);
  const [loadingProject, setLoadingProject] = useState(false);

  useEffect(() => {
    setLoadingProject(true);
    const getProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("createdOn", { ascending: false });

      if (error) {
        console.log(error.message);
        return;
      }

      setProjects(data);
    };

    getProjects();
    setLoadingProject(false);
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .order("taskId", { ascending: false });

      if (error) {
        console.log(error.message);
        return;
      }

      setTasks(data);
    };

    getTasks();
  }, []);

  useEffect(() => {
    const getConnections = async () => {
      const { data, error } = await supabase.from("connections").select("*");

      if (error) {
        console.log(error.message);
        return;
      }

      setConnections(data);
    };

    getConnections();
  }, []);

  useEffect(() => {
    const getRequests = async () => {
      const { data, error } = await supabase.from("requests").select("*");

      if (error) {
        console.log(error.message);
        return;
      }

      setPendingRequest(data);
    };

    getRequests();
  }, []);

  useEffect(() => {
    const getBookMarks = async () => {
      const { data, error } = await supabase.from("bookmarks").select("*");

      if (error) {
        console.log("error.message");
        return;
      }

      setBookmarks(data);
    };

    getBookMarks();
  }, []);

  useEffect(() => {
    const getNotification = async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("id", { ascending: false });

      if (error) {
        console.log(error.message);
        return;
      }

      setNotification(data);
    };

    getNotification();
  }, []);

  const addProject = async (project) => {
    const { data, error } = await supabase
      .from("projects")
      .insert(project)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setProjects((prev) => [data, ...prev]);
  };

  const toggleComplete = async (id, projectId) => {
    const project = projects.find(
      (project) => project.userId === id && project.createdOn === projectId,
    );

    if (!project) return;

    const { data, error } = await supabase
      .from("projects")
      .update({
        completed: !project.completed,
      })
      .eq("userId", id)
      .eq("createdOn", projectId)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setProjects((prev) =>
      prev.map((currProject) =>
        currProject.userId === id && currProject.createdOn === projectId
          ? data
          : currProject,
      ),
    );
  };

  const deleteProject = async (id, projectId) => {
    const { error: bookmarkError } = await supabase
      .from("bookmarks")
      .delete()
      .eq("project", projectId);

    if (bookmarkError) {
      console.log(bookmarkError.message);
      return;
    }

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("userId", id)
      .eq("createdOn", projectId);

    if (error) {
      console.log(error.message);
      return;
    }

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

  const toggleVisibility = async (projectId) => {
    const project = projects.find((project) => project.createdOn === projectId);

    if (!project) return;

    const newVisibility =
      project.visibility === "Public" ? "Private" : "Public";

    const { data, error } = await supabase
      .from("projects")
      .update({
        visibility: newVisibility,
      })
      .eq("createdOn", projectId)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setProjects((prev) =>
      prev.map((project) => (project.createdOn === projectId ? data : project)),
    );
  };

  const addTasks = async (task) => {
    const { data, error } = await supabase
      .from("tasks")
      .insert(task)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setTasks((prev) => [data, ...prev]);
  };

  const toggleCompleteTask = async (id) => {
    const task = tasks.find((task) => task.taskId === id);

    if (!task) return;

    const { data, error } = await supabase
      .from("tasks")
      .update({
        completed: !task.completed,
      })
      .eq("taskId", id)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setTasks((prev) =>
      prev.map((currTask) => (currTask.taskId === id ? data : currTask)),
    );
  };

  const deleteTask = async (id) => {
    const { error } = await supabase.from("tasks").delete().eq("taskId", id);

    if (error) {
      console.log(error.message);
      return;
    }

    setTasks((prev) => prev.filter((currTask) => currTask.taskId !== id));
  };

  const addConnection = async (senderId, receiverId) => {
    const connection = {
      senderId: senderId,
      receiverId: receiverId,
    };

    const { data, error } = await supabase
      .from("connections")
      .insert(connection)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setConnections((prev) => [data, ...prev]);
  };

  const deleteConnection = async (senderId, receiverId) => {
    const { error } = await supabase
      .from("connections")
      .delete()
      .or(
        `and(senderId.eq.${senderId},receiverId.eq.${receiverId}),and(senderId.eq.${receiverId},receiverId.eq.${senderId})`,
      );

    if (error) {
      console.log(error.message);
      return;
    }

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

  const addRequest = async (sender, receiver) => {
    const request = { sender: sender, receiver: receiver };

    const { data, error } = await supabase
      .from("requests")
      .insert(request)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setPendingRequest((prev) => [data, ...prev]);
  };

  const deleteRequest = async (sender, receiver) => {
    const { error } = await supabase
      .from("requests")
      .delete()
      .or(
        `and(sender.eq.${sender},receiver.eq.${receiver}),and(sender.eq.${receiver},receiver.eq.${sender})`,
      );

    if (error) {
      console.log(error.message);
      return;
    }

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

  const addBookMark = async (user, project) => {
    const bookmark = { user: user, project: project };

    const { data, error } = await supabase
      .from("bookmarks")
      .insert(bookmark)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setBookmarks((prev) => [data, ...prev]);
  };

  const removeBookMark = async (user, project) => {
    const { error } = await supabase
      .from("bookmarks")
      .delete()
      .eq("user", user)
      .eq("project", project);

    if (error) {
      console.log(error.message);
      return;
    }

    setBookmarks((prev) =>
      prev.filter(
        (currBookMark) =>
          !(currBookMark.user === user && currBookMark.project === project),
      ),
    );
  };

  const addNotification = async (notification) => {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setNotification((prev) => [data, ...prev]);
  };

  const removeNotification = async (notiId) => {
    console.log("remove");
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", notiId);

    if (error) {
      console.log(error.message);
      return;
    }

    setNotification((prev) =>
      prev.filter((notification) => notification.id !== notiId),
    );
  };

  const modifyRead = async (notiId) => {
    const { data, error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("id", notiId)
      .select()
      .single();

    if (error) {
      console.log(error.message);
      return;
    }

    setNotification((prev) =>
      prev.map((notification) =>
        notification.id === notiId
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const modifyReadAll = async (user) => {
    const { error } = await supabase
      .from("notifications")
      .update({ read: true })
      .eq("to", user)
      .eq("read", false);

    if (error) {
      console.log(error.message);
      return;
    }

    setNotification((prev) =>
      prev.map((notification) =>
        notification.to === user
          ? { ...notification, read: true }
          : notification,
      ),
    );
  };

  const deleteRead = async (user) => {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("to", user)
      .eq("read", true);

    if (error) {
      console.log(error.message);
      return;
    }

    setNotification((prev) =>
      prev.filter(
        (notification) => !(notification.to === user && notification.read),
      ),
    );
  };

  return (
    <NotificationProvider
      value={{
        notifications,
        addNotification,
        removeNotification,
        modifyRead,
        modifyReadAll,
        deleteRead,
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
              value={{
                projects,
                addProject,
                toggleComplete,
                deleteProject,
                toggleVisibility,
                loadingProject,
              }}
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
