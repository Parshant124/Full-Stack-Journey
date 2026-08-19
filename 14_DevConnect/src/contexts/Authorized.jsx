import React,{createContext, useContext} from "react";

export const AuthContext = createContext({
    Users : [],
    addUser: (userName, pass, email, fullName) => {},
    changePass: (userId, pass) => {},
    changeBio: (userId, bio) => {},
    changeImage: (userId, image) => {},
    changeFullName: (userId, fullName) => {},
    changeAbout: (userId, about) => {},
    changeDomain: (userId, domain) => {},
    changeCourse: (userId, course) => {},
    changeCollege: (usedId, college) => {}
})

export const AuthProvider = AuthContext.Provider

export const useAuth = () => {
    return useContext(AuthContext)
}