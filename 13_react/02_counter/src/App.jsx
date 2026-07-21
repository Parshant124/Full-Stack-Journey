import { useState } from 'react'

function App() {
  const [counter, setCounter] = useState(0)

  const [key, setKey] = useState("")
  const [value, setValue] = useState("")
  const userName = "Parshant"

  return (
    <>
      <h1>Hello {counter} {userName === "Parshant" ? "true":"false"}</h1>
      <h2>Hey {counter}</h2>
      <button onClick={() => counter<10 ? setCounter(counter + 1) : setCounter(-10)}>Increase</button>
      <button onClick={() => counter>-10 ? setCounter(counter - 1) : setCounter(10)}>Decrease</button>
    </>

    // <>
    //   <input type="text" onInput={(e) => setValue(e.target.value)} onKeyDown={(e) => setKey(e.code)}/>
    //   <h4>{key}</h4>
    //   <h4>{value}</h4>
    // </>
  );
}

export default App
