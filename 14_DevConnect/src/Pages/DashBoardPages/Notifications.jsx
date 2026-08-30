import { useState } from "react";
import { useAuth, useNotification } from "../../contexts";
import NotificationCard from "./components/NotificationCard";

function Notifications() {
  const { notifications, modifyReadAll, deleteRead } = useNotification();
  const { currentUser } = useAuth();

  const userId = currentUser?.id;
  const myNotifications = notifications.filter((noti) => noti.to === userId);
  return (
    <div className="p-4 h-full">
      <div className="flex justify-between sm:flex-row flex-col gap-4">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <h4 className="text-[14px] text-gray-600">
            Get notified for everything at one place.
          </h4>
        </div>
        {myNotifications.length > 0 && (
          <div className="flex gap-4">
            <button
              title="Mark All as Read"
              className="bg-purple-600 text-white px-4 rounded-md h-10 truncate"
              onClick={() => modifyReadAll(userId)}
            >
              Mark All as Read
            </button>
            <button
              title="Delete Read"
              className="bg-red-600 px-4 text-white rounded-md h-10 truncate"
              onClick={() => deleteRead(userId)}
            >
              Delete Read
            </button>
          </div>
        )}
      </div>
      <div className="h-full pt-4">
        {myNotifications.length > 0 ? (
          <div className="flex flex-col gap-2">
            {myNotifications.map((notification) => (
              <NotificationCard
                notification={notification}
                key={notification.id}
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <div className="h-50 w-50 flex">
              <img
                src="https://cdn-icons-png.flaticon.com/128/14038/14038200.png"
                alt=""
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-400">
              No Notification.
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
