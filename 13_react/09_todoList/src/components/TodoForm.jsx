import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext'

function TodoForm() {
    const[todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    function handleAdd(e){
        e.preventDefault()

        const todoMsg = todo.trim()

        if(!todoMsg) return;
        addTodo(todo)
        setTodo("")
    }

  return (
    <>
        <form onSubmit={handleAdd} className='flex justify-center mt-10 w-full'>
            <input 
            type="text"
            className='bg-white max-w-100 min-w-40 w-6/8 pl-2'
            placeholder='Write Todo'
            value={todo}
            onChange={(e)=>setTodo(e.target.value)}
            />
            <button 
            type="submit"
            className='text-white bg-blue-600 p-1 w-1/8 max-w-20 min-w-14'
            >Add</button>
        </form>
    </>
  )
}

export default TodoForm