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
import { CurrUserProvider, CurrSessionUserProvider } from "./contexts/index";

function App() {
  const [currUserId, setCurrUserId] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currUser"));
    return user?.[0] || "";
  });

  const [currUserEmail, setCurrUserEmail] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currUser"));
    return user?.[1] || "";
  });

  const [currUserFullName, setCurrUserFullName] = useState(() => {
    const user = JSON.parse(localStorage.getItem("currUser"));
    return user?.[2] || "";
  });

  const [currSessionUserId, setcurrSessionUserId] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem("sessionUser"));
    return user?.[0] || "";
  });
  const [currSessionUserEmail, setCurrSessionUserEmail] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem("sessionUser"));
    return user?.[1] || "";
  });

  const [currSessionUserFullName, setCurrSessionUserFullName] = useState(() => {
    const user = JSON.parse(sessionStorage.getItem("sessionUser"));
    return user?.[2] || "";
  });

  const handleCurrId = (id) => {
    setCurrUserId(id);
  };

  const handleCurrEmail = (email) => {
    setCurrUserEmail(email);
  };

  const handleCurrUserFullNam = (name) => {
    setCurrUserFullName(name);
  };

  const handleRememberUser = (userId, userEmail, userFullName) => {
    localStorage.setItem(
      "currUser",
      JSON.stringify([userId, userEmail, userFullName]),
    );
  };

  const handleSessionCurrId = (id) => {
    setcurrSessionUserId(id);
  };

  const handleSessionCurrEmail = (email) => {
    setCurrSessionUserEmail(email);
  };

  const handleSessionUser = (id, email, name) => {
    sessionStorage.setItem("sessionUser", JSON.stringify([id, email, name]));
  };

  const handleSessionCurrFullName = (name) => {
    setCurrSessionUserFullName(name);
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MarketingLayout />}>
          <Route
            index
            element={
              currUserId === "" && currSessionUserId === "" ? (
                <Home />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="about"
            element={
              currUserId === "" && currSessionUserId === "" ? (
                <About />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route
            path="features"
            element={
              currUserId === "" && currSessionUserId === "" ? (
                <Features />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
        </Route>
        ,
        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Navigate to="/dashboard" />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="signup"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Navigate to="/dashboard" />
              ) : (
                <SignUp />
              )
            }
          />
        </Route>
        ,
        <Route element={<DashboardLayout />}>
          <Route
            path="dashboard"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <DashBoard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="projects"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Projects />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="profile"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Profile />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="setting"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Settings />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="bookmarks"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Bookmarks />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="connections"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Connections />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="explore"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Explore />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="myprojects"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <My_Projects />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="notifications"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Notifications />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="tasks"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <Tasks />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="addproject"
            element={
              !(currUserId === "" && currSessionUserId === "") ? (
                <AddProject />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
        ,
      </>,
    ),
  );

  return (
    <CurrSessionUserProvider
      value={{
        currSessionUserId,
        currSessionUserEmail,
        currSessionUserFullName,
        handleSessionCurrEmail,
        handleSessionCurrId,
        handleSessionCurrFullName,
        handleSessionUser,
      }}
    >
      <CurrUserProvider
        value={{
          currUserId,
          currUserEmail,
          handleCurrId,
          handleCurrEmail,
          handleRememberUser,
        }}
      >
        <RouterProvider router={router} />
      </CurrUserProvider>
    </CurrSessionUserProvider>
  );
}

export default App;
