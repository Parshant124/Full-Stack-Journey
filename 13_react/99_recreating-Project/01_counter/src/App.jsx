import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const incValue = () => {
    setCount((prev) => (prev < 10 ? prev+1 : prev))
  }
  const decValue = () => {
    setCount((prev) => (prev > 0 ? prev-1 : prev))
  }
  return (
    <>
      <h2>Count: {count}</h2>
      <h2>Count: {count}</h2>
      <h2>Count: {count}</h2>
      <h2>Count: {count}</h2>
      <div>
        <button onClick={incValue}>Increase (upto 10)</button> {"   "}
        <button onClick={decValue}>Decrease (till 0)</button>
      </div>
    </>
  )
}

export default App
