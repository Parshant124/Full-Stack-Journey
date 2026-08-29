import React, { createContext, useContext } from "react";

export const AuthContext = createContext({
  Users: [],
  user: null,

  addUser: async () => {},
  login: async () => {},
  logout: async () => {},

  changePass: async () => {},
  changeBio: async () => {},
  changeImage: async () => {},
  changeFullName: async () => {},
  changeAbout: async () => {},
  changeDomain: async () => {},
  changeCourse: async () => {},
  changeCollege: async () => {},
});

export const AuthProvider = AuthContext.Provider;

export const useAuth = () => {
  return useContext(AuthContext);
};
