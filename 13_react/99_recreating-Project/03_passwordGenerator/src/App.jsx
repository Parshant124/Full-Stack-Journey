import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [password, setPassword] = useState("dg");
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const passRef = useRef()
  const generatePass = useCallback(() => {
    let letters = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (numberAllowed) letters += "0123456789";
    if (charAllowed) letters += "!@#$%^&*()_-+=";

    let pass = "";

    for (let i = 0; i < length; i++) {
      let char = letters[Math.floor(Math.random() * letters.length)];
      pass += char;
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePass()
  }, [length, numberAllowed, charAllowed])

  const handleCopy = () => {
    window.navigator.clipboard.writeText(password)
    passRef.current.select()
  }
  return (
    <>
      <div className="w-full h-screen bg-orange-500 flex justify-center items-center">
        <div className="w-1/2 flex flex-col gap-3 max-w-120 min-w-80 bg-gray-800 p-4 rounded shadow-[4px_4px_3px]">
          <div className="h-8 items-center flex">
            <input
              type="text"
              value={password}
              ref = {passRef}
              className="bg-gray-400 text-black px-2 rounded w-5/6 h-full"
            />
            <button className="bg-blue-700 text-white px-2 rounded h-full w-1/6"
            onClick={handleCopy}
            >
              copy
            </button>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <input
                type="range"
                min={6}
                max={25}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />
              <label htmlFor="" className="text-white">
                {length}
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              <label className="text-white">Numbers</label>
            </div>
            <div>
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              <label className="text-white">Special chars</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
