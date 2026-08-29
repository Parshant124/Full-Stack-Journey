import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

function AuthNav() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignUpPage = location.pathname === "/signup";

  return (
    <div className="flex w-full justify-between items-center">
      <Link to="/" className="w-40 flex">
        <img
          src=".\src\assets\DevConnect.png"
          alt=""
          width="200px"
          className="cursor-pointer"
        />
      </Link>
      <div className="sm:flex hidden justify-center">
        <Link to="/">Home</Link>
      </div>
      <div className="flex w-1/7 min-w-33 justify-between font-medium">
        {!isLoginPage && (
          <Link to="login">
            <button
              className={`min-w-15 text-white text-[14px] bg-purple-700 h-8 shadow-lg shadow-black/40 px-2`}
            >
              Login
            </button>
          </Link>
        )}
        {!isSignUpPage && (
          <Link to="signup">
            <button
              className={`min-w-15 text-white text-[14px] bg-purple-700 h-8 shadow-lg shadow-black/40 px-2`}
            >
              Sign Up
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default AuthNav;
