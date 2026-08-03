import React from 'react'
import { useTodo } from '../context/todoContext'
import { useState } from 'react'

function TodoForm() {
    const[todo, setTodo] = useState("")
    const {addTodos} = useTodo()

    const add = () => {
        const msg = todo.trim()

        if(!msg) return;

        addTodos(msg)
    }
  return (
    <div>
        <input type="text" 
        className='bg-white text-black'
        placeholder='Write todo'
        onChange={(e) => setTodo(e.target.value)}
        />
        <button className='bg-green-500 text-white px-1'
        onClick={add}
        >
            add
        </button>
    </div>
  )
}

export default TodoForm