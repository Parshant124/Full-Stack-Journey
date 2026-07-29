import React from 'react'
import { NavLink, Link } from "react-router-dom";
import { useCurrUser } from '../../contexts';

function DashboardNav() {
  const {currUserId} = useCurrUser()
  return (
    <div className="flex w-full justify-between">
      <div className="w-3/5 flex justify-between items-center font-medium">
        <NavLink to="/dashboard" className={`cursor-pointer`}>
          Dashboard
        </NavLink>
        <NavLink to="/projects" className={`cursor-pointer`}>
          Projects
        </NavLink>
        <NavLink to="/explore" className={`cursor-pointer`}>
          Explore
        </NavLink>
        <NavLink to="/notifications" className={`cursor-pointer`}>
          Notifications
        </NavLink>
      </div>
      <NavLink className="">
        <div className="w-8 h-8 bg-red-500 rounded-full flex justify-center items-center">
          <h3 className="text-white">{currUserId[0] || "U"}</h3>
        </div>
      </NavLink>
    </div>
  );
}

export default DashboardNav