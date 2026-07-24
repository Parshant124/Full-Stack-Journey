import React from "react";
import {NavLink, Link} from 'react-router-dom'

function Header() {
  return (
    <div className="flex justify-between px-10 h-16 w-full items-center shadow-lg">
      <div>
        <img
          src=".\src\assets\DevConnect.png"
          alt=""
          width="200px"
          className="cursor-pointer"
        />
      </div>
      <div className="flex w-1/3 justify-between font-medium">
        <NavLink to="/" className="cursor-pointer">
          Home
        </NavLink>
        <NavLink to="features" className="cursor-pointer">
          Features
        </NavLink>
        <NavLink to="about" className="cursor-pointer">
          About
        </NavLink>

      </div>
      <div className="flex w-1/7 min-w-33 justify-between font-medium">
        <Link to="login">
          <button className="w-2/5 min-w-15 shadow-lg bg-white h-8">
            Login
          </button>
        </Link>

        <Link to="signup">
          <button className="w-2/5 min-w-15 text-white bg-purple-700 h-8 shadow-lg">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
