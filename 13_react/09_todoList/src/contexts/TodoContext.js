import { createContext, useContext } from "react";

export const todoContext = createContext({
    todos: [{
        id: 1,
        todoMsg: "Task 1",
        completed: false
    }],
    addTodo: (todo) => {},
    updateTodo: (id, updateMsg) => {},
    deleteTodo: (id) => {},
    toggleCompleted: (id) => {}
})

export const TodoProvider = todoContext.Provider

export const useTodo = () => {
    return useContext(todoContext)
}