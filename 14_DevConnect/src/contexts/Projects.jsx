import React, { useContext, createContext } from "react";

const projectContext = createContext({
  projects: [{}],
  addProject: () => {},
  toggleComplete: () => {}
});

export const ProjectProvider = projectContext.Provider;

export const useProject = () => {
  return useContext(projectContext);
};
