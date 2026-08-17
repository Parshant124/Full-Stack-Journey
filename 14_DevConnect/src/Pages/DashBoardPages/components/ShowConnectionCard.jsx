import React, { useEffect, useState } from "react";
import {
  useAuth,
  useConnection,
  useCurrSessionUser,
  useCurrUser,
} from "../../../contexts";

function ShowConnectionCard({ userId }) {
  const { Users } = useAuth();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const {
    connections,
    pendingRequest,
    addRequest,
    deleteRequest,
    addConnection,
    deleteConnection,
  } = useConnection();

  const userInfo = Users.find((curr) => curr.id === userId);
  const currId = currUserId || currSessionUserId;

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
      addRequest(currId, userId);
    }
    setConnected((prev) => (prev == 1 ? 2 : 1));
  };

  const handleAccept = () => {
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
      <div className="flex gap-4 items-center">
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
          <h2 className="font-semibold ">{userInfo.fullName}</h2>
          <h4 className="text-[14px] text-gray-600">
            {userInfo.about || "User about not given"}
          </h4>
        </div>
      </div>
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
