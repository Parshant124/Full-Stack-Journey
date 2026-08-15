import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth, useCurrSessionUser, useCurrUser } from "../../contexts";

function DashboardNav() {
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const { Users } = useAuth();

  const currUser = currUserId || currSessionUserId;

  const userInfo = Users.find((user) => user.id === currUser);

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
        <div>
          {userInfo.image ? (
            <div className="w-12 h-12 flex">
              <img
                src={userInfo.image}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="w-10 h-10 bg-red-500 rounded-full flex justify-center items-center">
              <h3 className="text-white">
                {currUser ? userInfo.id[0].toUpperCase() : "U"}
              </h3>
            </div>
          )}
        </div>
      </NavLink>
    </div>
  );
}

export default DashboardNav;
