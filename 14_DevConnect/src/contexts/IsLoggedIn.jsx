import { useContext, createContext, useState } from "react";

export const LoggedInContext = createContext();

export function LoggedInProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
}

export const useLoggedIn = () => {
  const context = useContext(LoggedInContext);

  if (!context) throw new Error("error occured");

  return context;
};
