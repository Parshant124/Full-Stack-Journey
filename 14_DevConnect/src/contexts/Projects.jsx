import React,{useContext, createContext} from "react";

const projectContext = createContext({
    projects: [{
        userId : "" ,
        name : "",
        projectKey : "",
        desc : "",
        category : "",
        visibility : "",
        image : ""
    }],
    addProject : () => {}
})

export const ProjectProvider = projectContext.Provider

export const useProject = () => {
    return useContext(projectContext)
}