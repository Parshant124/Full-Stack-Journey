import React, { useEffect, useState } from "react";
import {
  useAuth,
  useConnection,
  useNotification,
} from "../../../contexts";
import { NavLink } from "react-router-dom";

function ShowConnectionCard({ userId }) {
  const { Users, currentUser } = useAuth();
  const {
    connections,
    pendingRequest,
    addRequest,
    deleteRequest,
    addConnection,
    deleteConnection,
  } = useConnection();
  const { addNotification } = useNotification()

  const userInfo = Users.find((curr) => curr.id === userId);
  const currId = currentUser?.id;

  const [connected, setConnected] = useState(1);

  useEffect(() => {
    const filtered = pendingRequest.filter(
      (prev) =>
        (prev.sender === userId && prev.receiver === currId) ||
        (prev.sender === currId && prev.receiver === userId),
    );
    setConnected(
      filtered.length > 0 ? (filtered[0].sender === currId ? 2 : 3) : 1,
    );
  }, [currId, userId, pendingRequest]);

  useEffect(() => {
    const checkConnected = connections.filter(
      (prev) =>
        (prev.senderId === userId && prev.receiverId === currId) ||
        (prev.senderId === currId && prev.receiverId === userId),
    );

    if (checkConnected.length > 0) setConnected(4);
  }, [currId, userId, connections]);

  const handleConnect = () => {
    if (connected == 2) {
      deleteRequest(currId, userId);
    } else if (connected == 1) {
      const now = new Date();
      const currInfo = Users.find((user) => user.id === currId);
      const noti = {
        type: "request accepted",
        // userImage: currInfo.image || "",
        msg: `${currInfo.fullName || "User"} sent you a connection request.`,
        to: userId,
        read: false,
        date:
          `${String(now.getDate()).padStart(2, "0")}/` +
          `${String(now.getMonth() + 1).padStart(2, "0")}/` +
          `${now.getFullYear()}`,
        time:
          `${String(now.getHours()).padStart(2, "0")}:` +
          `${String(now.getMinutes()).padStart(2, "0")}`,
        nav: `/profile/${currId}`,
      };

      addNotification(noti);
      addRequest(currId, userId);
    }
    setConnected((prev) => (prev == 1 ? 2 : 1));
  };

  const handleAccept = () => {
    const now = new Date();
    const currInfo = Users.find((user) => user.id === currId);
    const noti = {
      type: "request accepted",
      // userImage: currInfo.image || "",
      msg: `${currInfo.fullName || "User"} accepted your connection request.`,
      to: userInfo.id,
      read: false,
      date:
        `${String(now.getDate()).padStart(2, "0")}/` +
        `${String(now.getMonth() + 1).padStart(2, "0")}/` +
        `${now.getFullYear()}`,
      time:
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}`,
      nav: `/profile/${currId}`,
    };

    addNotification(noti);
    addConnection(currId, userId);
    deleteRequest(currId, userId);
    setConnected(4);
  };

  const handleReject = () => {
    deleteRequest(currId, userId);
    setConnected(1);
  };

  const handleDisconnect = () => {
    deleteConnection(currId, userId);
    setConnected(1);
  };

  return (
    <div
      className="flex w-full justify-between border-b-2 pb-4 border-gray-300"
      key={userId}
    >
      <NavLink to={`/profile/${userInfo.id}`} className="flex gap-4 items-center">
        <div className="h-12 w-12 flex">
          <img
            src={
              userInfo.image ||
              "https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
            }
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h2 className="font-semibold line-clamp-1">{userInfo.fullName}</h2>
          <h4 className="text-[14px] text-gray-600 line-clamp-1">
            {userInfo.bio || "User bio not given"}
          </h4>
        </div>
      </NavLink>
      <div>
        {connected == 1 && (
          <button
            className={`font-semibold text-white bg-purple-700 px-3 py-2 rounded-lg text-[14px]`}
            onClick={handleConnect}
          >
            Connect
          </button>
        )}
        {connected == 2 && (
          <button
            className={`font-semibold text-purple-800 border-2 bg-white px-2 py-2 rounded-lg text-[14px]`}
            onClick={handleConnect}
          >
            Request Sent
          </button>
        )}
        {connected == 3 && (
          <div
            className={`flex gap-4 font-semibold text-green-800 bg-white rounded-lg text-[14px]`}
          >
            <button
              onClick={handleAccept}
              className="text-green-800 border-2 bg-white px-2 py-2 rounded-lg"
            >
              {" "}
              Accept{" "}
            </button>
            <button
              onClick={handleReject}
              className="text-red-600 border-2 bg-white px-2 py-2 rounded-lg"
            >
              {" "}
              Reject{" "}
            </button>
          </div>
        )}
        {connected == 4 && (
          <button
            className={`font-semibold text-green-800 border-2 bg-white px-2 py-2 rounded-lg text-[14px]`}
            onClick={handleDisconnect}
          >
            Connected
          </button>
        )}
      </div>
    </div>
  );
}

export default ShowConnectionCard;
