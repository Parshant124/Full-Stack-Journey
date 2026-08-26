import { createContext, useContext } from "react";

const Notification = createContext({
  notifications: [
    {
      type: "follow request/request accepted/connection project/project bookmarked",
      image: "",
      msg: "",
      to: "",
      date: "",
      time: "",
      read: false,
      id: "",
    },
  ],
  addNotification: (noti) => {},
  removeNotification: (id, noti) => {},
  modifyReadAll:(user) => {},
  modifyRead: (id) => {}
});

export const NotificationProvider = Notification.Provider

export const useNotification = () => {
    return useContext(Notification)
}