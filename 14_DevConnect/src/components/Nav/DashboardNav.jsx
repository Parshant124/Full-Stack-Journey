import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  useAuth,
  useCurrSessionUser,
  useCurrUser,
  useNotification,
} from "../../contexts";

function DashboardNav() {
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const { Users } = useAuth();
  const { notifications } = useNotification();
  const [showMore, setShowMore] = useState(false);
  const popupRef = useRef(null);
  const [logOut, setLogOut] = useState(false);
  const navigate = useNavigate();
  const { handleCurrEmail, handleCurrId, handleRememberUser } = useCurrUser();
  const {
    handleSessionCurrId,
    handleSessionCurrEmail,
    handleSessionUser,
    handleSessionCurrFullName,
  } = useCurrSessionUser();
  const location = useLocation();

  const handleLogOut = () => {
    handleCurrEmail("");
    handleCurrId("");
    handleRememberUser("", "");

    handleSessionCurrId("");
    handleSessionCurrEmail("");
    handleSessionCurrFullName("");
    handleSessionUser("", "", "");

    navigate("/");
  };


  const currUser = currUserId || currSessionUserId;

  const myNotification = notifications.filter(
    (noti) => noti.to == currUser && !noti.read,
  );

  const userInfo = Users.find((user) => user.id === currUser);

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
    <div className="flex w-full justify-between py-2 items-center">
      <div className="flex items-center gap-4 relative">
        <button
          className="w-6 block lg:hidden"
          onClick={() => setShowMore((prev) => !prev)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9091/9091427.png"
            alt=""
          />
        </button>
        {showMore && (
          <div
            className="absolute top-10 left-0 lg:hidden bg-white shadow-lg py-4 rounded-lg shadow-purple-400"
            ref={popupRef}
          >
            <div className="flex flex-col px-4 py-2 gap-4 font-medium">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${isActive ? "bg-purple-200 text-purple-800" : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4 border-b-2`
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
                  `${isActive || location.pathname === "/addproject" ? "bg-purple-200 text-purple-800" : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4 border-b-2`
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
                to="/projects"
                className={({ isActive }) =>
                  `${isActive || location.pathname === "/addproject" ? "bg-purple-200 text-purple-800" : "text-black"} px-1 py-1.5 rounded-lg flex sm:hidden items-center gap-4 border-b-2`
                }
              >
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4257/4257459.png"
                    alt=""
                    width="22px"
                    className={`${location.pathname === "/projects" ? "hidden" : "block"}`}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/4257/4257460.png"
                    alt=""
                    width="22px"
                    className={`${location.pathname === "/projects" ? "block" : "hidden"}`}
                  />
                </div>
                <h4>Projects</h4>
              </NavLink>
              <NavLink
                to="/explore"
                className={({ isActive }) =>
                  `${isActive || location.pathname === "/addproject" ? "bg-purple-200 text-purple-800" : "text-black"} px-1 py-1.5 rounded-lg flex sm:hidden items-center gap-4 border-b-2`
                }
              >
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6881/6881172.png"
                    alt=""
                    width="22px"
                    className={`${location.pathname === "/explore" ? "hidden" : "block"}`}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/253/253318.png"
                    alt=""
                    width="22px"
                    className={`${location.pathname === "/explore" ? "block" : "hidden"}`}
                  />
                </div>
                <h4>Explore</h4>
              </NavLink>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `${isActive || location.pathname === "/addproject" ? "bg-purple-200 text-purple-800" : "text-black"} px-1 py-1.5 rounded-lg flex sm:hidden items-center gap-4 border-b-2`
                }
              >
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2645/2645897.png"
                    alt=""
                    width="22px"
                    className={`${location.pathname === "/notifications" ? "hidden" : "block"}`}
                  />
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2645/2645890.png"
                    alt=""
                    width="22px"
                    className={`${location.pathname === "/notifications" ? "block" : "hidden"}`}
                  />
                </div>
                <h4>Notifications</h4>
              </NavLink>
              <NavLink
                to="/tasks"
                className={({ isActive }) =>
                  `${isActive ? "bg-purple-200 text-purple-800 " : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4 border-b-2`
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
                  `${isActive ? "bg-purple-200 text-purple-800 " : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4 border-b-2`
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
                  `${isActive ? "bg-purple-200 text-purple-800 " : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4 border-b-2`
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
                  `${isActive ? "bg-purple-200 text-purple-800 " : "text-black"} px-1 py-1.5 rounded-lg flex items-center gap-4 border-b-2`
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
              <button
                className="flex items-center gap-4 bg-red-500 text-white text-center w-full px-1 py-1.5 rounded-lg border-b-2 border-black"
                onClick={() => setLogOut(true)}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10313/10313098.png"
                  alt=""
                  width="25"
                  className=""
                />
                Log Out
              </button>
            </div>

            <div
              className={`${logOut ? "block" : "hidden"} absolute w-full h-full flex justify-center items-baseline-last bg-black/10 top-0 left-0`}
            >
              <div className="bg-white p-2 rounded-lg shadow-lg absolute bottom-15">
                <h2 className="text-black text-2xl font-bold">Are you Sure?</h2>
                <div className="flex justify-between p-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md flex flex-col"
                    onClick={handleLogOut}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-purple-600 text-white px-2 py-1 rounded-md flex flex-col"
                    onClick={() => setLogOut(false)}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <Link to="/" className="w-40 flex">
          <img
            src=".\src\assets\DevConnect.png"
            alt=""
            width="200px"
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="w-3/5 sm:flex hidden justify-between items-center font-medium">
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
        <div className="relative">
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `${isActive ? "text-purple-800 underline underline-offset-8" : "text-gray-700"} cursor-pointer`
            }
          >
            Notifications
          </NavLink>
          {myNotification.length > 0 && (
            <h4 className="absolute bottom-2 -right-2 text-[12px] rounded-full bg-red-600 text-white h-4 w-4 text-center">
              {myNotification.length}
            </h4>
          )}
        </div>
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
