import { useState } from 'react'
import { TodoProvider } from './context/todoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoDisplay from './components/TodoDisplay'
import { useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])

  const addTodos = (todo) => {
    setTodos((prev) => [{id: Date.now(), todoMsg: todo, completed:false}, ...prev])
  }

  const updateTodos = (id, newMsg) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, todoMsg: newMsg} : prevTodo))
  }

  const deleteTodos = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todoItems = JSON.parse(localStorage.getItem("todos"));
    if (todoItems && todoItems.length > 0) {
      setTodos(todoItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodos, updateTodos, deleteTodos, toggleComplete }}
    >
      <h1 className="">TEST</h1>
      <TodoForm />
      {todos.map((todo) => (
        <div key={todo.id}>
          <TodoDisplay todo={todo} />
        </div>
      ))}
    </TodoProvider>
  );
}

export default App
