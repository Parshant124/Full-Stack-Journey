import { createContext, useContext } from "react";

export const TasksContext = createContext({
  tasks: [{}],
  addTasks: () => {},
  toggleCompleteTask: () => {},
  deleteTask: () => {},
});

export const TasksProvider = TasksContext.Provider;

export const useTasks = () => {
  return useContext(TasksContext);
};
