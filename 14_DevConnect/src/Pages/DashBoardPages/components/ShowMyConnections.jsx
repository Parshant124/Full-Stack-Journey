import React from "react";
import {
  useAuth,
  useConnection,
} from "../../../contexts";
import ShowConnectionCard from "./ShowConnectionCard";

function ShowMyConnections({ showType }) {
  const { connections } = useConnection();
  const { currentUser } = useAuth();
  const { Users } = useAuth();

  const userId = currentUser?.id;

  const connectedUsers = connections
    .filter((conn) => conn.senderId === userId || conn.receiverId === userId)
    .map((conn) =>
      conn.senderId === userId ? conn.receiverId : conn.senderId,
    );

  const allUsers = Users.map((user) => user.id).filter(
    (user) => user !== userId,
  );

  const otherUsers = allUsers.filter(
    (user) => !connectedUsers.includes(user),
  );

  const toShow =
    showType === "all"
      ? allUsers
      : showType === "connected"
        ? connectedUsers
        : otherUsers;

  return (
    <div>
      {toShow.length == 0 ? (
        <div className="h-full w-full text-center text-3xl">
          {" "}
          Nothing to show{" "}
        </div>
      ) : (
        toShow.map((user) => (
          <div className="bg-white p-4 rounded-lg">
            <ShowConnectionCard userId={user} />
          </div>
        ))
      )}
    </div>
  );
}

export default ShowMyConnections;
