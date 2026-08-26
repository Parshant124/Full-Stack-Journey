import React, { useRef, useEffect } from "react";
import { useNotification } from "../../../contexts";

function NotificationCard({
  notification,
  openNotification,
  setOpenNotification,
}) {
  const { modifyRead, removeNotification } = useNotification();
  const dropdownRef = useRef(null);

  const showMore = openNotification === notification.id;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenNotification(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpenNotification]);

  return (
    <div
      className={`px-2 py-4 ${
        notification.read ? "bg-gray-200" : "bg-purple-300"
      } rounded-md flex justify-between`}
    >
      <div className="w-2/3 flex items-center gap-4">
        <div className="h-12 w-12">
          <img
            src={
              notification.userImage ||
              "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
            }
            alt=""
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <h4
          className={`${
            notification.read ? "text-black" : "text-white"
          } truncate line-clamp-1`}
        >
          {notification.msg}
        </h4>
      </div>

      <div className="w-1/4 flex items-center justify-between relative">
        <div
          className={`${
            notification.read ? "text-black" : "text-white"
          } flex flex-col justify-center`}
        >
          <h4>{notification.time}</h4>
          <h4>{notification.date}</h4>
        </div>

        <div ref={dropdownRef}>
          <button
            className="w-5"
            onClick={() =>
              setOpenNotification(showMore ? null : notification.id)
            }
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/512/512222.png"
              alt=""
            />
          </button>

          {showMore && (
            <div className="absolute right-0 top-1/2 bg-white w-fit flex flex-col p-2 gap-2 rounded-md">
              <button
                className="border-b-2 pb-2 border-gray-300"
                onClick={() => modifyRead(notification.id)}
              >
                Mark as Read
              </button>

              <button onClick={() => removeNotification(notification.id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NotificationCard;
