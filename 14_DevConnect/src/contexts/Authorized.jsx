import React,{createContext, useContext} from "react";

export const AuthContext = createContext({
    Users : [],
    addUser: (userName, pass, email, fullName) => {},
    changePass: (userId, pass) => {},
    changeBio: (userId, bio) => {},
    changeImage: (userId, image) => {},
    changeFullName: (userId, fullName) => {}
})

export const AuthProvider = AuthContext.Provider

export const useAuth = () => {
    return useContext(AuthContext)
}