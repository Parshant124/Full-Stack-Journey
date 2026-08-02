import { useState } from 'react'
import Form from './Form';
import { useEffect } from 'react';
import useCurrency from './useCurrency';


function App() {
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [to, setTo] = useState("inr")
  const [from, setFrom] = useState("usd")

  const currencyInfo = useCurrency(from);
  const options = Object.keys(currencyInfo);

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  const swap = () => {
    setTo(from)
    setFrom(to)
    setAmount(convertedAmount)
  }

  useEffect(()=>{
    convert()
  },[to, from, amount])

  return (
    <div className="w-3/4 max-w-200 min-w-100 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
      <Form
        label="From"
        amount={amount}
        setAmount={setAmount}
        currency={from}
        changeCurrency={setFrom}
        currencyList={options}
      />
      <h1 className="relative">
        <button className='absolute text-white bg-blue-600 px-1 rounded left-3/7 -top-4 cursor-pointer' 
        onClick={swap}
        >Swap</button>
      </h1>
      <Form
        label="To"
        disableAmount={true}
        amount={convertedAmount}
        currency={to}
        changeCurrency={setTo}
        currencyList={options}
      />
    </div>
  );
}

export default App
