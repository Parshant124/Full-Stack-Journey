import React from "react";
import { useParams } from "react-router-dom";
import { useConnection, useCurrSessionUser, useCurrUser } from "../../contexts";
import UserConnectionCard from "./components/UserConnectionCard";

function UserConnections() {
  const { userName } = useParams();
  const { connections } = useConnection();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();

  const currId = currSessionUserId || currUserId;

  const userConnection = connections
    .filter(
      (connection) =>
        (connection.senderId === userName ||
          connection.receiverId === userName) &&
        connection.senderId !== currId &&
        connection.receiverId !== currId,
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
          <UserConnectionCard userId={connection} />
        </div>
      ))}
    </div>
  );
}

export default UserConnections;
