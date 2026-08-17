import React from "react";
import { NavLink } from "react-router-dom";
import {
  useAuth,
  useConnection,
  useCurrSessionUser,
  useCurrUser,
} from "../../contexts";
import ExplorePeopleCard from "./components/ExplorePeopleCard";

function Explore() {
  const { Users } = useAuth();
  const { connections, pendingRequest } = useConnection();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();

  const userId = currSessionUserId || currUserId;

  const connectedUsers = connections
    .filter((conn) => conn.senderId === userId || conn.receiverId === userId)
    .map((conn) =>
      conn.senderId === userId ? conn.receiverId : conn.senderId,
    );

  const allUsers = Users.map((user) => user.id).filter(
    (user) => user !== userId,
  );

  const requestReceived = pendingRequest
    .filter((request) => request.receiver === userId)
    .map((user) => user.sender);
  const requestSent = pendingRequest
    .filter((request) => request.sender === userId)
    .map((user) => user.receiver);
  const otherUsers = allUsers.filter(
    (user) => !connectedUsers.includes(user) && !requestSent.includes(user) && !requestReceived.includes(user),
  );

  return (
    <div className="p-4 flex flex-col gap-4 bg-gray-100 h-full w-full">
      <div>
        <h2 className="text-2xl font-bold">Explore</h2>
        <h4 className="text-[14px] text-gray-600">
          Discover developers, projects and oppurtunities
        </h4>
      </div>
      <div className="flex items-center gap-2 border-2 w-1/3 py-1 px-2 rounded-md border-gray-300">
        <img
          src="https://cdn-icons-png.flaticon.com/128/3031/3031293.png"
          alt=""
          className="w-4 h-4"
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Search people, projects..."
          className="text-[14px] w-full outline-none"
        />
      </div>
      <div className="flex gap-2">
        <button className="border-2 border-purple-600 rounded-md px-2 py-1 text-[14px] text-purple-600">
          All
        </button>
        <NavLink
          to="/connections"
          className="border-2 border-gray-300 rounded-md px-2 py-1 text-[14px] text-gray-600"
        >
          People
        </NavLink>
        <NavLink
          to="/projects"
          className="border-2 border-gray-300 rounded-md px-2 py-1 text-[14px] text-gray-600"
        >
          Projects
        </NavLink>
      </div>
      <div className="w-full flex gap-6 h-full">
        <div className="w-1/2 bg-white p-4 flex flex-col gap-4 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h2 className="font-semibold">People to follow</h2>
            <NavLink to="/connections" className="text-purple-800 text-[14px]">
              View all
            </NavLink>
          </div>
          <div className="w-full h-full">
            {otherUsers.length ? (
              otherUsers.map((user) => (
                <div key={user}>
                  <ExplorePeopleCard
                    user={user}
                    requestReceive={requestReceived.includes(user)}
                    requestSent={requestSent.includes(user)}
                  />
                </div>
              ))
            ) : (
              <div className="flex w-full justify-center items-center h-full">
                <h4 className="text-3xl font-bold text-gray-600">Nothing...</h4>
              </div>
            )}
          </div>
        </div>
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between">
            <h2 className="font-semibold text-[14px]">Trending Projects</h2>
            <NavLink to="/projects" className="text-purple-600 text-[14px]">
              View all
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Explore;
