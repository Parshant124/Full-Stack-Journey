import React,{useState} from 'react'
import { useAuth, useConnection, useCurrSessionUser, useCurrUser } from '../../../contexts'

function UserConnectionCard({userId}) {
      const [showMessage, setShowMessage] = useState(false);
      const {connections, pendingRequest, addConnection, addRequest, deleteConnection, deleteRequest} = useConnection();
        const { currSessionUserId } = useCurrSessionUser();
        const { currUserId } = useCurrUser();
        const currId = currSessionUserId || currUserId;
    
    const {Users} = useAuth();
    const userInfo = Users.find((user) => user.id === userId);

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
      deleteRequest(userId, currId);
      addConnection(userId, currId);
      setConnectionStatus(1);
    };

    const handleRejectRequest = () => {
      deleteRequest(userId, currId);
      setConnectionStatus(4);
    };

    const handleConnect = () => {
      addRequest(currId, userId);
      setConnectionStatus(2);
    };
  return (
    <div className='relative'>
      {userInfo.fullName}
      <div className="border-b-2 pb-4 border-gray-300 flex justify-center pt-2">
        {connectionStatus === 1 && (
          <button
            className="border-2 w-full py-2  text-green-800 rounded-lg font-semibold"
            onClick={handleRemoveConnection}
          >
            Connected
          </button>
        )}

        {connectionStatus === 2 && (
          <button
            className="border-2 w-full py-2  text-purple-600 rounded-lg font-semibold"
            onClick={handleDeleteRequest}
          >
            Request Sent
          </button>
        )}
        {connectionStatus === 3 && (
          <div className="w-1/2 flex justify-around">
            <button
              className="w-1/3 border-2 text-green-800 px-4 py-2 rounded-md font-semibold"
              onClick={handleAcceptRequest}
            >
              Accept
            </button>
            <button
              className="w-1/3 border-2 text-red-600 px-4 py-2 rounded-md font-semibold"
              onClick={handleRejectRequest}
            >
              Reject
            </button>
          </div>
        )}
        {connectionStatus === 4 && (
          <button
            className="border-2 w-full py-2 bg-purple-600 text-white rounded-lg font-semibold"
            onClick={handleConnect}
          >
            Connect
          </button>
        )}
      </div>
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

export default UserConnectionCard