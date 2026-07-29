import React,{createContext, useContext} from "react";

export const AuthContext = createContext({
    Users : [],
    addUser: (userName, pass, email, fullName) => {},
    changePass: (userId, pass) => {}
})

export const AuthProvider = AuthContext.Provider

export const useAuth = () => {
    return useContext(AuthContext)
}