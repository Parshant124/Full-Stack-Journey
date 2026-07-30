import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUsername] = useState("")
    const {setUser} = useContext(UserContext)

    function handleSubmit(){
        setUser(username)
    }
  return (
    <div>
        <input 
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        />{"  "}
        <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default Login