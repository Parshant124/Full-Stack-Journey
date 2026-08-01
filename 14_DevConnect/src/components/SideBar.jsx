import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCurrUser, useCurrSessionUser } from "../contexts";

function SideBar() {
  const navigate = useNavigate()
  const {handleCurrEmail, handleCurrId, handleRememberUser} = useCurrUser()
  const { handleSessionCurrId, handleSessionCurrEmail, handleSessionUser, handleSessionCurrFullName } = useCurrSessionUser();
  const location = useLocation()

  const handleLogOut = () => {
    handleCurrEmail("")
    handleCurrId("")
    handleRememberUser("", "")

    handleSessionCurrId("");
    handleSessionCurrEmail("");
    handleSessionCurrFullName("");
    handleSessionUser("", "", "");

    navigate("/")
  }

  return (
    <div className="overflow-y-auto h-full border-r-2 border-gray-400 flex flex-col justify-between py-4">
      <div className="flex flex-col px-2 gap-4 font-medium">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${isActive ? "bg-purple-200 text-purple-800" : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4`
          }
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1946/1946488.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/dashboard" ? "hidden" : "block"}`}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/1946/1946436.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/dashboard" ? "block" : "hidden"}`}
            />
          </div>
          <h4>Overview</h4>
        </NavLink>
        <NavLink
          to="/myprojects"
          className={({ isActive }) =>
            `${isActive || location.pathname === "/addproject" ? "bg-purple-200 text-purple-800" : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4`
          }
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9720/9720869.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/myprojects" || location.pathname === "/addproject" ? "hidden" : "block"}`}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/9720/9720920.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/myprojects" || location.pathname === "/addproject" ? "block" : "hidden"}`}
            />
          </div>
          <h4>My Projects</h4>
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `${isActive ? "bg-purple-200 text-purple-800 " : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4`
          }
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9741/9741134.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/tasks" ? "hidden" : "block"}`}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/6831/6831818.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/tasks" ? "block" : "hidden"}`}
            />
          </div>
          <h4>Tasks</h4>
        </NavLink>
        <NavLink
          to="/connections"
          className={({ isActive }) =>
            `${isActive ? "bg-purple-200 text-purple-800 " : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4`
          }
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/4549/4549612.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/connections" ? "hidden" : "block"}`}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/1307/1307909.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/connections" ? "block" : "hidden"}`}
            />
          </div>
          <h4>Connections</h4>
        </NavLink>
        <NavLink
          to="/bookmarks"
          className={({ isActive }) =>
            `${isActive ? "bg-purple-200 text-purple-800 " : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4`
          }
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/25/25667.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/bookmarks" ? "hidden" : "block"}`}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/102/102279.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/bookmarks" ? "block" : "hidden"}`}
            />
          </div>
          <h4>Bookmark</h4>
        </NavLink>
        <NavLink
          to="/setting"
          className={({ isActive }) =>
            `${isActive ? "bg-purple-200 text-purple-800 " : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4`
          }
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2040/2040504.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/setting" ? "hidden" : "block"}`}
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/503/503849.png"
              alt=""
              width="22px"
              className={`${location.pathname === "/setting" ? "block" : "hidden"}`}
            />
          </div>
          <h4>Settings</h4>
        </NavLink>
      </div>
      <div className="w-full px-4">
        <button
          className="bg-red-500 text-white text-center w-full py-1"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
