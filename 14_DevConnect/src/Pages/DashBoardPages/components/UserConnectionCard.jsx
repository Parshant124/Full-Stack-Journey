import React, { useState } from "react";
import {
  useAuth,
  useConnection,
  useNotification,
} from "../../../contexts";
import { NavLink } from "react-router-dom";

function UserConnectionCard({ userId, currUser }) {
  const [showMessage, setShowMessage] = useState(false);
  const {
    connections,
    pendingRequest,
    addConnection,
    addRequest,
    deleteConnection,
    deleteRequest,
  } = useConnection();
  const { addNotification } = useNotification();
  
  
  const { Users, currentUser } = useAuth();
  const userInfo = Users.find((user) => user.id === userId);
  const currId = currentUser?.id;

  const myConnection = connections
    .filter(
      (connection) =>
        connection.senderId === userId || connection.receiverId === userId,
    )
    .map((connection) =>
      connection.senderId === userId
        ? connection.receiverId
        : connection.senderId,
    );
  const requestSent = pendingRequest
    .filter((request) => request.sender === currId)
    .map((request) => request.receiver);

  const requestReceived = pendingRequest
    .filter((request) => request.receiver === currId)
    .map((request) => request.sender);

  const [connectionStatus, setConnectionStatus] = useState(() => {
    return myConnection.includes(currId)
      ? 1
      : requestSent.includes(userId)
        ? 2
        : requestReceived.includes(userId)
          ? 3
          : 4;
  });

  const handleRemoveConnection = () => {
    setShowMessage(true);
  };

  const handleYesRemove = () => {
    setShowMessage(false);
    deleteConnection(currId, userId);
    setConnectionStatus(4);
  };

  const handleDeleteRequest = () => {
    deleteRequest(userId, currId);
    setConnectionStatus(4);
  };

  const handleAcceptRequest = () => {
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
    deleteRequest(userId, currId);
    addConnection(userId, currId);
    setConnectionStatus(1);
  };

  const handleRejectRequest = () => {
    deleteRequest(userId, currId);
    setConnectionStatus(4);
  };

  const handleConnect = () => {
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
    setConnectionStatus(2);
  };
  return (
    <div className="relative flex border-b-2 p-4 border-gray-300 justify-between w-full z-0">
      <NavLink to={`/profile/${userId}`} className="flex items-center gap-2">
        <div className="h-12 w-12 flex">
          <img
            src={
              userInfo.image ||
              `https://cdn-icons-png.flaticon.com/128/3001/3001758.png`
            }
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold">{userInfo.fullName}</h2>
          <h4 className="text-[14px] text-gray-600">
            {userInfo.bio || "Bio not available"}
          </h4>
        </div>
      </NavLink>
      {!currUser && (
        <div className="flex">
          {connectionStatus === 1 && (
            <button
              className="border-2 w-full py-1 px-2 text-green-800 rounded-lg font-semibold"
              onClick={handleRemoveConnection}
            >
              Connected
            </button>
          )}

          {connectionStatus === 2 && (
            <button
              className="border-2 w-full py-1 px-2 text-purple-600 rounded-lg font-semibold"
              onClick={handleDeleteRequest}
            >
              Request Sent
            </button>
          )}
          {connectionStatus === 3 && (
            <div className="flex justify-around gap-4">
              <button
                className="w-fit border-2 text-green-800 px-2 py-1 rounded-md font-semibold"
                onClick={handleAcceptRequest}
              >
                Accept
              </button>
              <button
                className="w-fit border-2 text-red-600 px-2 py-1 rounded-md font-semibold"
                onClick={handleRejectRequest}
              >
                Reject
              </button>
            </div>
          )}
          {connectionStatus === 4 && (
            <button
              className="border-2 w-full py-1 px-2 bg-purple-600 text-white rounded-lg font-semibold"
              onClick={handleConnect}
            >
              Connect
            </button>
          )}
        </div>
      )}
      <div
        className={`absolute w-full -top-1 -left-1 ${showMessage ? "flex" : "hidden"} flex-col items-center justify-center`}
      >
        <div className="bg-white flex flex-col gap-4 p-4 shadow-lg rounded-lg w-80">
          <h2 className="text-xl font-semibold">
            Are you sure to remove{" "}
            <span className="text-purple-600">{userInfo.fullName}</span> as a
            Connection?
          </h2>
          <div className="flex justify-around">
            <button
              className="border-2 rounded-lg text-red-600 px-2 py-1 font-semibold"
              onClick={handleYesRemove}
            >
              Yes
            </button>
            <button
              className="border-2 rounded-lg text-green-800 px-2 py-1 font-semibold"
              onClick={() => setShowMessage(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserConnectionCard;
