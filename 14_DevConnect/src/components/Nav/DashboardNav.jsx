import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useCurrSessionUser, useCurrUser } from "../../contexts";

function DashboardNav() {
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();

  return (
    <div className="flex w-full justify-between">
      <div className="w-3/5 flex justify-between items-center font-medium">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer`
          }
        >
          Projects
        </NavLink>
        <NavLink
          to="/explore"
          className={({ isActive }) =>
            `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer`
          }
        >
          Explore
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer`
          }
        >
          Notifications
        </NavLink>
      </div>
      <NavLink to="/profile" className="">
        <div className="w-8 h-8 bg-red-500 rounded-full flex justify-center items-center">
          <h3 className="text-white">
            {currSessionUserId
              ? currSessionUserId[0].toUpperCase()
              : currUserId
                ? currUserId[0].toUpperCase()
                : "U"}
          </h3>
        </div>
      </NavLink>
    </div>
  );
}

export default DashboardNav;
