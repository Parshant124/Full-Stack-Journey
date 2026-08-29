import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

function MarketingNav() {
  const [showMore, setShowMore] = useState(false);
  const popupRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="flex w-full justify-between relative items-center">
      {showMore && (
        <div
          className="absolute top-10 left-0 h-fit px-4 py-2 flex md:hidden flex-col gap-4 bg-white shadow-lg rounded-b-xl"
          ref={popupRef}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer border-b-2 border-gray-300 hover:bg-purple-300 p-2 rounded-lg text-center`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="features"
            className={({ isActive }) =>
              `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer border-b-2 pb-2 border-gray-300 hover:bg-purple-300 p-2 rounded-lg text-center`
            }
          >
            Features
          </NavLink>
          <NavLink
            to="about"
            className={({ isActive }) =>
              `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer border-b-2 pb-2 border-gray-300 hover:bg-purple-300 p-2 rounded-lg text-center`
            }
          >
            About
          </NavLink>
        </div>
      )}
      <div className="sm:flex sm:justify-between sm:w-2/3">
        <div className="flex gap-4">
          <button
            className="w-8 md:hidden"
            onClick={() => setShowMore((prev) => !prev)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/9091/9091427.png"
              alt=""
            />
          </button>
          <Link to="/" className="w-40">
            <img
              src=".\src\assets\DevConnect.png"
              alt=""
              width="200px"
              className="cursor-pointer"
            />
          </Link>
        </div>
        <div className="md:flex hidden sm:w-1/2 sm:justify-between sm:font-medium">
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
      </div>
      <div className="sm:flex sm:w-1/7 sm:min-w-33 sm:justify-between sm:font-medium flex justify-end w-full gap-4">
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

export default MarketingNav;
