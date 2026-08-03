import React from 'react'
import {NavLink } from 'react-router-dom'

function Header() {
  return (
    <div>
      <h1>Header</h1>
      <div className="flex justify-between w-full">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${isActive ? "text-red-400" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="about"
          className={({ isActive }) => `${isActive ? "text-red-400" : ""}`}
        >
          About
        </NavLink>
        <NavLink
          to="contact"
          className={({ isActive }) => `${isActive ? "text-red-400" : ""}`}
        >
          Contact
        </NavLink>
      </div>
    </div>
  );
}

export default Header