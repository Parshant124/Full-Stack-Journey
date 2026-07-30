import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoItem({todo}) {
    const[isEditable, setIsEditable] = useState(false)
    const [Msg, setMsg] = useState(todo.todoMsg)
    

    const {updateTodo, deleteTodo, toggleCompleted} = useTodo()

    const handleUpdate = () => {
        updateTodo(todo.id, Msg)
    }

    const handleDelete = () => {
        deleteTodo(todo.id)
    }

    const handleToggle = () => {
        toggleCompleted(todo.id)
    }

  return (
    <div className="flex justify-center my-2 w-full h-10 items-center">
      <div
        className={` ${todo.completed ? "bg-green-300" : "bg-orange-200"} w-5/8 max-w-120 min-w-54 h-full`}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <input
          type="text"
          value={Msg}
          readOnly={!isEditable}
          onChange={(e) => setMsg(e.target.value)}
          className={`w-6/8 ${isEditable ? "border rounded" : "focus:outline-none"} ${todo.completed ? "line-through" : ""}`}
        />
        <button
          className={`w-1/10 bg-green-500 h-full ${todo.completed ? "line-through" : ""}`}
          onClick={() => {
            if(todo.completed) return;
            
            if(isEditable) handleUpdate()

            setIsEditable((prev) => !prev)
        }}
          disabled={todo.completed}
        >
          {isEditable ? "✔" : "✏️"}
        </button>
        <button className="w-1/10 bg-red-600 ml-2 h-full"
        onClick={handleDelete}
        >🗑️</button>
      </div>
    </div>
  );
}

export default TodoItem