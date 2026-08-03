import React from 'react'
import { useTodo } from '../context/todoContext'
import { useState } from 'react'

function TodoDisplay({todo}) {
    const[isEditable, setIsEditable] = useState(false)
    const[msg, setMsg] = useState(todo.todoMsg)

    const handleEdit = () => {
        console.log(1)
        if(isEditable){
            const newMsg = msg.trim()

            if(!newMsg) return;
            console.log(2);

            updateTodos(todo.id, newMsg)
        }

        console.log(3);

        setIsEditable((prev) => !prev)
    }
    const {updateTodos, deleteTodos, toggleComplete} = useTodo()
  return (
    <div>
        <input type="checkbox" checked={todo.completed} onChange={() => toggleComplete(todo.id)}/>
        <input 
        type="text" 
        value={msg}
        className={`${todo.completed ? "line-through" : "" }`}
        readOnly={!isEditable}
        onChange={(e) => setMsg(e.target.value)}
        />
        <button onClick={handleEdit}>{isEditable ? "Save" : "Edit"}</button>
        <button onClick={() => deleteTodos(todo.id)}>delete</button>
    </div>
  )
}

export default TodoDisplay