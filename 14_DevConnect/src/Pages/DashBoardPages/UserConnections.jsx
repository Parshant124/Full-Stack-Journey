import React from "react";
import { useParams } from "react-router-dom";

function UserConnections() {
  const { userName } = useParams();

  return <div>UserConnections : {userName}</div>;
}

export default UserConnections;
