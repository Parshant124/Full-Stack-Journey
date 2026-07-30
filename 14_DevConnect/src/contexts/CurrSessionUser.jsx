import React, { createContext, useContext } from "react";

const SessionUserContext = createContext({
  currSessionUserId: "",
  currSessionUserEmail: "",
  currSessionUserFullName: "",
  handleSessionCurrId: (id) => {},
  handleSessionCurrEmail: (email) => {},
  handleSessionCurrFullName: (name) => {},
  handleSessionUser: (id, email) => {},
});

export const CurrSessionUserProvider = SessionUserContext.Provider;

export const useCurrSessionUser = () => {
  return useContext(SessionUserContext);
};