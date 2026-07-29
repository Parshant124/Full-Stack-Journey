import { useState } from 'react'
import Login from './components/Login'
import UserContextProvider from './context/UserContextProvider'
import Profile from './components/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <h1 className='bg-green-700 text-2xl text-white'>Test</h1>
      <Login />
      <Profile />
    </UserContextProvider>
  )
}

export default App
