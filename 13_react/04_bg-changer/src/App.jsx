import { useState } from 'react'

import './App.css'

function App() {
  const [color, setColor] = useState("pink")

  return (
    <>
      <div className="h-screen w-full" style={{ backgroundColor: color }}>
        <div className="fixed flex flex-col justify-center items-center top-20 left-4 gap-4 bg-gray-400 p-4 rounded-lg shadow-[4px_5px_2px_rgba(0,0,0,0.7)]">
          <button
            className="bg-red-500 rounded w-full shadow-[2px_3px_1px_rgba(0,0,0,0.7)] hover:cursor-pointer text-white"
            onClick={() => setColor("red")}
          >
            red
          </button>
          <button
            className="bg-blue-500 rounded w-full shadow-[2px_3px_1px_rgba(0,0,0,0.7)] hover:cursor-pointer text-white"
            onClick={() => setColor("blue")}
          >
            blue
          </button>
          <button
            className="bg-green-700 rounded w-full shadow-[2px_3px_1px_rgba(0,0,0,0.7)] hover:cursor-pointer text-white"
            onClick={() => setColor("green")}
          >
            green
          </button>
          <button
            className="bg-yellow-400 rounded w-full shadow-[2px_3px_1px_rgba(0,0,0,0.7)] hover:cursor-pointer text-white"
            onClick={() => setColor("yellow")}
          >
            yellow
          </button>
          <button
            className="bg-purple-500 rounded w-full shadow-[2px_3px_1px_rgba(0,0,0,0.7)] hover:cursor-pointer text-white"
            onClick={() => setColor("purple")}
          >
            purple
          </button>
          <button
            className="bg-orange-500 rounded w-full shadow-[2px_3px_1px_rgba(0,0,0,0.7)] px-2 hover:cursor-pointer text-white"
            onClick={() => setColor("orange")}
          >
            orange
          </button>
        </div>
      </div>
    </>
  );
}

export default App
