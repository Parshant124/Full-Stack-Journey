import React from "react";
import { useParams } from "react-router-dom";
import { useConnection } from "../../contexts";
import UserConnectionCard from "./components/UserConnectionCard";

function UserConnections() {
  const { userName } = useParams();
  const { connections } = useConnection();
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

  console.log(userConnection);

  return (
    <div>
      {userConnection.map((connection) => (
        <div><UserConnectionCard userId={connection}/></div>
      ))}
    </div>
  );
}

export default UserConnections;
