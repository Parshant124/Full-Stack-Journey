import React from 'react'
import { NavLink, Link } from 'react-router-dom';

function MarketingNav() {
  return (
    <div className='flex w-full justify-between'>
      <div className="flex w-1/2 justify-between font-medium">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="features"
          className={({ isActive }) =>
            `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer`
          }
        >
          Features
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) =>
            `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer`
          }
        >
          About
        </NavLink>
      </div>
      <div className="flex w-1/7 min-w-33 justify-between font-medium">
        <Link to="login">
          <button
            className={`w-2/5 min-w-15 shadow-lg text-[14px] shadow-black/40 bg-white h-8`}
          >
            Login
          </button>
        </Link>

        <Link to="signup">
          <button
            className={`w-2/5 min-w-15 text-white text-[14px] bg-purple-700 h-8 shadow-lg shadow-black/40`}
          >
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MarketingNav