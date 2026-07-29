import React, { useState, useContext } from 'react'
import UserContext from '../context/UserContext'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setUser({username, password})
    }

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border rounded px-2"
        placeholder='username'
      />
      {"   "}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border rounded px-2"
        placeholder='password'
      />
      <button onClick={handleSubmit} className='bg-blue-600 text-white p-2 rounded-lg'>Submit</button>
    </div>
  );
}

export default Login