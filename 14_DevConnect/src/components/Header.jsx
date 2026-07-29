import React, { useState } from "react";
import {NavLink, Link} from 'react-router-dom'
import MarketingNav from "./Nav/MarketingNav";
import AuthNav from "./Nav/AuthNav"
import DashboardNav from "./Nav/DashboardNav"

function Header({type}) {

  return (
    <div className="flex justify-between px-10 h-16 w-full items-center shadow-lg">
      <Link to="/">
        <img
          src=".\src\assets\DevConnect.png"
          alt=""
          width="200px"
          className="cursor-pointer"
        />
      </Link>
      <div className="w-3/4">
        {type === "marketingNav" && <MarketingNav />}
        {type === "authNav" && <AuthNav />}
        {type === "dashNav" && <DashboardNav />}
      </div>
    </div>
  );
}

export default Header;
