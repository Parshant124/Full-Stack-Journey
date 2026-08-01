import { useState } from 'react'
import Card from './Card'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="text-3xl">Test</h1>
      <Card
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkHhtul-iECJWNOHEIqWBYWYzPwvkS_sjntWmWDVl4bw&s=10"
        title="Victory lap"
      />
      <Card
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSGZPwv8VMRTRsmHz97Nbv1oKL266dpzdHrFVRSSWyHQ&s=10"
        title="Enigma"
      />
      <Card
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb1YMz9KxnYkRPaiixEoo5aYwWXWg9dYYnBr1AKpuCiw&s=10"
        title="PB X1"
      />
    </>
  );
}

export default App
