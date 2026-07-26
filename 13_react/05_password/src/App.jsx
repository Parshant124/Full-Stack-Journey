import { useState, useCallback, useEffect, useRef} from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passRef = useRef()

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"

    if(numberAllowed) str += "1234567890"
    if(charAllowed) str += "!@#$%^&*()_+"

    for(let i=0; i<length; i++){
      let idx = Math.floor(Math.random() * str.length + 1)

      pass += str.charAt(idx)
      
    }

    setPassword(pass)
  },[length, numberAllowed, charAllowed])

  const copyPassword = () =>{
    window.navigator.clipboard.writeText(password)
    passRef.current.select()
  }

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  return (
    <>
      <div className="bg-gray-400 flex flex-col justify-center items-center p-6 rounded-xl shadow-[6px_6px_10px]">
        <div>
          <h2 className="text-white text-2xl">Password Generator</h2>
        </div>
        <div className="flex gap-4 p-4">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Password"
            className="border rounded p-1 bg-gray-200"
            ref={passRef}
          />
          <button className="bg-blue-600 p-0.5 text-white rounded hover:cursor-pointer shadow-[3px_2px_2px_black]"
          onClick={copyPassword}
          >
            copy
          </button>
        </div>
        <div>
          <div className="flex gap-4">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
              name=""
              id=""
            />
            <label htmlFor="length">Length: {length}</label>
          </div>
          <div className="flex gap-4 justify-center items-center text-orange-500">
            <div>
              <input type="checkbox" 
              name="" 
              id=""
              onChange={()=>{setNumberAllowed((prev) => !prev)}}
              />
              <label htmlFor="number">Numbers</label>
            </div>
            <div>
              <input type="checkbox" 
              name="" 
              id="" 
              onChange={()=>{setCharAllowed((prev) => !false)}}
              />
              <label htmlFor="characters">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
