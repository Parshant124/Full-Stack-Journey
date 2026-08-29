import { supabase } from "./lib/supabaseClient.js";
import { useEffect, useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Home, Features, About } from "./Pages/MarketingPages/index";
import { Login, SignUp } from "./Pages/AuthorizatonPages/index";

import {
  Profile,
  Projects,
  Settings,
  DashBoard,
  Bookmarks,
  Connections,
  Explore,
  My_Projects,
  Notifications,
  Tasks,
} from "./Pages/DashBoardPages/index";

import ComingSoon from "./Pages/ComingSoon.jsx";
import AddProject from "./Pages/DashBoardPages/components/AddProject.jsx";
import MarketingLayout from "./Layout/MarketingLayout";
import AuthLayout from "./Layout/AuthLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import AddTask from "./Pages/DashBoardPages/components/AddTask.jsx";

import { AuthProvider } from "./contexts/index";

import User from "./Pages/DashBoardPages/User.jsx";
import UserProject from "./Pages/DashBoardPages/UserProject.jsx";
import UserConnections from "./Pages/DashBoardPages/UserConnections.jsx";
import UserTask from "./Pages/DashBoardPages/UserTask.jsx";
import UpdatePassword from "./Pages/AuthorizatonPages/UpdatePassword.jsx";

function App() {
  /* =========================
     SUPABASE AUTH
  ========================= */

  const [user, setUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  /* =========================
     USERS TABLE
  ========================= */

  const [Users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");

      if (error) {
        console.log(error.message);
        return;
      }

      setUsers(data);
    };

    getUsers();
  }, []);

  /* =========================
     AUTH SESSION
  ========================= */

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log(error.message);
        return;
      }

      const authUser = data.session?.user ?? null;
      setUser(authUser);

      if (authUser) {
        const { data: profile, error: profileError } = await supabase
          .from("users")
          .select("*")
          .eq("email", authUser.email)
          .single();

        if (profileError) {
          console.log(profileError.message);
          return;
        }

        setCurrentUser(profile);
      }
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      const authUser = session?.user ?? null;
      setUser(authUser);

      if (!authUser) {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  /* =========================
     LOGIN
  ========================= */

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      return { error };
    }

    return { data };
  };

  /* =========================
     LOGOUT
  ========================= */

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log(error.message);
      return { error };
    }

    return { success: true };
  };

  /* =========================
     PASSWORD
  ========================= */

  const changePass = async (pass) => {
    const { error } = await supabase.auth.updateUser({
      password: pass,
    });

    if (error) {
      console.log(error.message);
      return { error };
    }

    return { success: true };
  };

  /* =========================
     USER PROFILE FUNCTIONS
  ========================= */

  const changeBio = async (userId, bio) => {
    const { error } = await supabase
      .from("users")
      .update({ bio })
      .eq("id", userId);

    if (error) {
      console.log(error.message);
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, bio } : user)),
    );
  };

  const changeAbout = async (userId, about) => {
    const { error } = await supabase
      .from("users")
      .update({ about })
      .eq("id", userId);

    if (error) {
      console.log(error.message);
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, about } : user)),
    );
  };

  const changeDomain = async (userId, domain) => {
    const { error } = await supabase
      .from("users")
      .update({ domain })
      .eq("id", userId);

    if (error) {
      console.log(error.message);
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, domain } : user)),
    );
  };

  const changeFullName = async (userId, fullName) => {
    const { error } = await supabase
      .from("users")
      .update({ fullName })
      .eq("id", userId);

    if (error) {
      console.log(error.message);
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, fullName } : user)),
    );
  };

  const changeCourse = async (userId, course) => {
    const { error } = await supabase
      .from("users")
      .update({ course })
      .eq("id", userId);

    if (error) {
      console.log(error.message);
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, course } : user)),
    );
  };

  const changeCollege = async (userId, college) => {
    const { error } = await supabase
      .from("users")
      .update({ college })
      .eq("id", userId);

    if (error) {
      console.log(error.message);
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, college } : user)),
    );
  };

  const changeImage = async (userId, image) => {
    const { error } = await supabase
      .from("users")
      .update({ image })
      .eq("id", userId);

    if (error) {
      console.log(error.message);
      return;
    }

    setUsers((prev) =>
      prev.map((user) => (user.id === userId ? { ...user, image } : user)),
    );
  };

  /* =========================
     ROUTER
  ========================= */

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* ================= MARKETING ================= */}

        <Route element={<MarketingLayout />}>
          <Route
            index
            element={!user ? <Home /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="about"
            element={!user ? <About /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="features"
            element={!user ? <Features /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="comingsoon"
            element={!user ? <ComingSoon /> : <Navigate to="/dashboard" />}
          />
        </Route>

        {/* ================= AUTH ================= */}

        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route
            path="signup"
            element={user ? <Navigate to="/dashboard" /> : <SignUp />}
          />

          {/* 
            IMPORTANT:
            Update password needs the Supabase recovery session.
            Therefore don't block it just because the normal
            application user state is not set.
          */}
          <Route path="/update-password" element={<UpdatePassword />} />
        </Route>

        {/* ================= DASHBOARD ================= */}

        <Route element={<DashboardLayout />}>
          <Route
            path="dashboard"
            element={user ? <DashBoard /> : <Navigate to="/login" />}
          />

          <Route
            path="projects"
            element={user ? <Projects /> : <Navigate to="/login" />}
          />

          <Route
            path="projects/:userName"
            element={user ? <UserProject /> : <Navigate to="/login" />}
          />

          <Route
            path="profile"
            element={user ? <Profile /> : <Navigate to="/login" />}
          />

          <Route
            path="profile/:userName"
            element={user ? <User /> : <Navigate to="/login" />}
          />

          <Route
            path="setting"
            element={user ? <Settings /> : <Navigate to="/login" />}
          />

          <Route
            path="bookmarks"
            element={user ? <Bookmarks /> : <Navigate to="/login" />}
          />

          <Route
            path="connections"
            element={user ? <Connections /> : <Navigate to="/login" />}
          />

          <Route
            path="connections/:userName"
            element={user ? <UserConnections /> : <Navigate to="/login" />}
          />

          <Route
            path="explore"
            element={user ? <Explore /> : <Navigate to="/login" />}
          />

          <Route
            path="myprojects"
            element={user ? <My_Projects /> : <Navigate to="/login" />}
          />

          <Route
            path="notifications"
            element={user ? <Notifications /> : <Navigate to="/login" />}
          />

          <Route
            path="tasks"
            element={user ? <Tasks /> : <Navigate to="/login" />}
          />

          <Route
            path="tasks/:userName"
            element={user ? <UserTask /> : <Navigate to="/login" />}
          />

          <Route
            path="addproject"
            element={user ? <AddProject /> : <Navigate to="/login" />}
          />

          <Route
            path="addtask"
            element={user ? <AddTask /> : <Navigate to="/login" />}
          />
        </Route>
      </>,
    ),
  );

  /* =========================
     PROVIDERS
  ========================= */

  return (
    <AuthProvider
      value={{
        Users,
        user,
        currentUser,
        login,
        logout,
        changePass,
        changeBio,
        changeImage,
        changeFullName,
        changeAbout,
        changeDomain,
        changeCollege,
        changeCourse,
      }}
    >
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
