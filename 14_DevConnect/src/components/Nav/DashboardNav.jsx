import React from 'react'
import { NavLink, Link } from "react-router-dom";

function DashboardNav() {
  return (
    <div>
      <div className="flex w-1/3 justify-between font-medium">
        <NavLink
          to="projects"
          className={`cursor-pointer`}
        >
          Projects
        </NavLink>
        <NavLink
          to="comingsoon"
          className={`cursor-pointer`}
        >
          Explore
        </NavLink>
      </div>
      
    </div>
  );
}

export default DashboardNav