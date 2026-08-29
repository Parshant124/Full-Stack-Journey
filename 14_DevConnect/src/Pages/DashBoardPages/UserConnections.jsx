import React from "react";
import { useParams } from "react-router-dom";
import { useAuth, useConnection } from "../../contexts";
import UserConnectionCard from "./components/UserConnectionCard";

function UserConnections() {
  const { userName } = useParams();
  const { connections } = useConnection();
  const { currentUser } = useAuth();

  const currId = currentUser?.id;

  const userConnection = connections
    .filter(
      (connection) =>
        connection.senderId === userName || connection.receiverId === userName,
    )
    .map((connection) =>
      connection.senderId === userName
        ? connection.receiverId
        : connection.senderId,
    );

  return (
    <div>
      {userConnection.map((connection) => (
        <div>
          <UserConnectionCard
            userId={connection}
            currUser={connection === currId}
          />
        </div>
      ))}
    </div>
  );
}

export default UserConnections;
