import React, { createContext, useContext } from "react";

const UserContext = createContext({
  currUserId: "",
  currUserEmail: "",
  currUserFullName: "",
  handleCurrId: (id) => {},
  handleCurrEmail: (email) => {},
  handleCurrUserFullName: (name) => {},
  handleRememberUser: (id, email) => {},
});

export const CurrUserProvider = UserContext.Provider;

export const useCurrUser = () => {
  return useContext(UserContext);
};
