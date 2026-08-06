import React from "react";
import {
  useAuth,
  useConnection,
  useCurrSessionUser,
  useCurrUser,
} from "../../../contexts";
import ShowConnectionCard from "./ShowConnectionCard";

function SearchMyConnections({ value }) {
  const { connections, addConnection } = useConnection();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const { Users } = useAuth();

  const userId = currSessionUserId || currUserId;

  const connectedUsers = connections
    .filter((conn) => conn.senderId === userId || conn.receiverId === userId)
    .map((conn) =>
      conn.senderId === userId ? conn.receiverId : conn.senderId,
    );

  const allUsers = Users.map((user) => user.id);

  const otherUsers = allUsers.filter(
    (user) => user !== userId,
  );

  const filteredConnections = otherUsers.filter((user) => {
    const userInfo = Users.filter((curr) => curr.id === user);

    return userInfo[0].fullName.trim().toLowerCase().includes(value.toLowerCase());
  });
  return (
    <div>
      {filteredConnections.length == 0 ? (
        <div className="h-full w-full text-center text-3xl">
          {" "}
          Nothing to show{" "}
        </div>
      ) : (
        filteredConnections.map((user) => (
          <div className="bg-white p-4 rounded-lg">
            <ShowConnectionCard userId={user} />
          </div>
        ))
      )}
    </div>
  );
}

export default SearchMyConnections;
