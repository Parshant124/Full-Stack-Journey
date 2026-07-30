import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/TodoContext';
import { TodoForm, TodoItem } from './components';

function App() {
  const[todos, setTodos] = useState([])

  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), todoMsg: todo, completed:false}, ...prev])
  }

  const updateTodo = (id, updateMsg) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, todoMsg : updateMsg} : prevTodo))
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevTodo) => prevTodo.id !== id))
  }

  const toggleCompleted = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed : !prevTodo.completed} : prevTodo))
  }

  useEffect(() => {
    const todoItems = JSON.parse(localStorage.getItem("todos"))
    if(todoItems && todoItems.length > 0){
      setTodos(todoItems)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  return (
    <TodoProvider
      value={{todos, addTodo, updateTodo, deleteTodo, toggleCompleted}}
    >
      <TodoForm />
      {
        todos.map((todo) => (
          <div key={todo.id}>
            <TodoItem todo={todo} />
          </div>
        ))
      }
    </TodoProvider>
  );
}

export default App
