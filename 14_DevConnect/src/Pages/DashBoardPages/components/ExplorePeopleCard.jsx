import { useAuth, useConnection, useNotification } from "../../../contexts";

function ExplorePeopleCard({ user, requestReceive, requestSent }) {
  const { Users, currentUser } = useAuth();
  const { addConnection, addRequest, deleteRequest } = useConnection();
  const { addNotification } = useNotification();

  const userInfo = Users.find((currUser) => currUser.id === user);
  const userId = currentUser?.id;

  const handleAdd = () => {
    const nowDate = new Date().toISOString().split("T")[0];
    const now = new Date();
    const currInfo = Users.find((user) => user.id === userId);
    const noti = {
      type: "request accepted",
      userImage: currInfo.userImage || "",
      msg: `${currInfo.fullName || "User"} accepted your connection request.`,
      to: userInfo.id,
      read: false,
      date: nowDate,
      time:
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}`,
      nav: `/profile/${userId}`,
    };

    addNotification(noti);
    addConnection(user, userId);
    deleteRequest(user, userId);
  };

  const handleFollowRequest = () => {
    const nowDate = new Date().toISOString().split("T")[0];
    const now = new Date();
    const currInfo = Users.find((user) => user.id === userId);
    const noti = {
      type: "request accepted",
      userImage: currInfo.userImage || "",
      msg: `${currInfo.fullName || "User"} sent you a connection request.`,
      to: userId,
      read: false,
      date: nowDate,
      time:
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}`,
      nav: `/profile/${userId}`,
    };

    addNotification(noti);
    addRequest(userId, user);
  };
  return (
    <div className="flex justify-between items-center pt-4 pb-4 border-b-2 border-gray-300">
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 flex">
          <img
            src={
              userInfo.userImage ||
              "https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
            }
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-[14px] font-semibold line-clamp-1">
            {userInfo.fullName}
          </h2>
          <h4 className="text-[14px] text-gray-600 line-clamp-1">
            {userInfo.bio}
          </h4>
        </div>
      </div>
      <div>
        <div>
          {requestReceive ? (
            <div className="flex gap-4">
              <button
                className="text-[14px] font-semibold text-green-700 border-2 border-green-300 px-2 py-1 rounded-md"
                onClick={handleAdd}
              >
                Accept
              </button>
              <button
                className="text-[14px] font-semibold text-red-700 border-2 border-red-300 px-2 py-1 rounded-md"
                onClick={() => deleteRequest(userId, user)}
              >
                Reject
              </button>
            </div>
          ) : requestSent ? (
            "Request is sent"
          ) : (
            <button
              className="text-[14px] font-semibold text-purple-700 border-2 border-purple-300 px-2 py-1 rounded-md"
              onClick={handleFollowRequest}
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
