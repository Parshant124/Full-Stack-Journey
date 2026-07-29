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
import MarketingLayout from "./Layout/MarketingLayout";
import AuthLayout from "./Layout/AuthLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import { CurrUserProvider, useCurrUser } from "./contexts/index";

function App() {
  const [currUserId, setCurrUserId] = useState("");
  const [currUserEmail, setCurrUserEmail] = useState("");

  const handleCurrId = (id) => {
    setCurrUserId(id);
  };

  const handleCurrEmail = (email) => {
    setCurrUserEmail(email);
  };

  useEffect(() => {
    const [id, email] = JSON.parse(localStorage.getItem("currUser")) || ["", ""];
    if (id) {
      setCurrUserId(id);
    }
    if (email) {
      setCurrUserEmail(email);
    }
  }, []);

  const handleRememberUser = (userId, userEmail) => {
    console.log(currUserId)
    console.log(currUserEmail)
    localStorage.setItem(
      "currUser",
      JSON.stringify([userId, userEmail]),
    );
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MarketingLayout />}>
          <Route
            index
            element={currUserId === "" ? <Home /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="about"
            element={currUserId === "" ? <About /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="features"
            element={currUserId === "" ? <Features /> : <Navigate to="/dashboard" />}
          />
        </Route>
        ,
        <Route element={<AuthLayout />}>
          <Route
            path="login"
            element={currUserId === "" ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="signup"
            element={currUserId === "" ? <SignUp /> : <Navigate to="/dashboard" />}
          />
        </Route>
        ,
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={currUserId === "" ? <Navigate to="/login" /> : <DashBoard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="profile" element={<Profile />} />
          <Route path="setting" element={<Settings />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="connections" element={<Connections />} />
          <Route path="explore" element={<Explore />} />
          <Route path="myprojects" element={<My_Projects />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
        ,
      </>,
    ),
  );

  return (
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
  );
}

export default App;
