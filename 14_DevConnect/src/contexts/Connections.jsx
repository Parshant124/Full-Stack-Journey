import React, { createContext, useContext } from "react";

const Connections = createContext({
  connections: [],
  pendingRequest: [],
  addRequest: () => {},
  deleteRequest: () => {},
  addConnection: () => {},
  deleteConnection: () => {},
});

export const ConnectionProvider = Connections.Provider;

export const useConnection = () => {
  return useContext(Connections);
};
