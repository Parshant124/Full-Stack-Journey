import React from "react";
import {
  useAuth,
  useConnection,
  useCurrSessionUser,
  useCurrUser,
} from "../../../contexts";

function ExplorePeopleCard({ user, requestReceive }) {
  const { Users } = useAuth();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const { addConnection, addRequest, deleteRequest } = useConnection();

  const userInfo = Users.find((currUser) => currUser.id === user);
  const userId = currSessionUserId || currUserId;
  return (
    <div className="flex justify-between items-center pt-4 pb-4 border-b-2 border-gray-300">
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10">
          <img
            src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div>
          <h2 className="text-[14px] font-semibold">{userInfo.fullName}</h2>
          <h4 className="text-[14px] text-gray-600">{userInfo.about}</h4>
        </div>
      </div>
      <div>
        <div>
          {requestReceive ? (
            <div className="flex gap-4">
              <button className="text-[14px] font-semibold text-green-700 border-2 border-green-300 px-2 py-1 rounded-md"
              onClick={() => addConnection(userId, user)}
              >
                Accept
              </button>
              <button className="text-[14px] font-semibold text-red-700 border-2 border-red-300 px-2 py-1 rounded-md"
              onClick={() => deleteRequest(userId, user)}
              >
                Reject
              </button>
            </div>
          ) : (
            <button className="text-[14px] font-semibold text-purple-700 border-2 border-purple-300 px-2 py-1 rounded-md"
            onClick={() => addRequest(userId, user)}
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorePeopleCard;
