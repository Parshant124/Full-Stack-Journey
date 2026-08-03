import React,{createContext, useContext} from "react";
import { use } from "react";

export const TodoContext = createContext({
    todos: [], // {id, todoMsg, completed}
    addTodos: (todo) => {},
    updateTodos: (id, newMsg) => {},
    deleteTodos: (id) => {},
    toggleComplete: (id) => {},
})

export const TodoProvider = TodoContext.Provider

export const useTodo = () => {
    return useContext(TodoContext)
}