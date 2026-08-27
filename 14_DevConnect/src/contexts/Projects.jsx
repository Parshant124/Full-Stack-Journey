import React, { useContext, createContext } from "react";

const projectContext = createContext({
  projects: [{}],
  addProject: () => {},
  toggleComplete: () => {},
  deleteProject: () => {},
  toggleVisibility: () => {}
});

export const ProjectProvider = projectContext.Provider;

export const useProject = () => {
  return useContext(projectContext);
};
