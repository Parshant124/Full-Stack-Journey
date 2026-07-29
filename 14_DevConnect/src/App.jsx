import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import {
  About,
  ComingSoon,
  Features,
  Home,
  Login,
  SignUp,
  Profile,
  Projects,
  Settings,
  DashBoard,
} from "./Pages/index";
import MarketingLayout from "./Layout/MarketingLayout";
import AuthLayout from "./Layout/AuthLayout";
import DashboardLayout from "./Layout/DashboardLayout";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<MarketingLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="features" element={<Features />} />
        </Route>
        ,
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        ,
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="projects" element={<Projects />} />
        </Route>
        ,
      </>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
