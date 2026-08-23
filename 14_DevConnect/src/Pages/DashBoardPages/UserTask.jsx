import React from "react";
import { useParams } from "react-router-dom";

function UserTask() {
  const { userName } = useParams();

  return <div>UserTask : {userName}</div>;
}

export default UserTask;
