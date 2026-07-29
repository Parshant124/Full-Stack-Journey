import React,{createContext, useContext} from "react";

const UserContext = createContext(
    {
        currUserId: "",
        currUserEmail: "",
        handleCurrId: (id) => {},
        handleCurrEmail: (email) => {},
        handleRememberUser: (id, email) => {} 
    }
)

export const CurrUserProvider = UserContext.Provider

export const useCurrUser = () => {
    return useContext(UserContext)
}