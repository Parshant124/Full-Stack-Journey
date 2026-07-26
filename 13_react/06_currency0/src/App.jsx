import { useState, useEffect } from 'react'
import InputBox from './components/InputBox.jsx';
import useCurrency from './hooks/useCurrency.js';

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState('inr')
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [to, setTo] = useState('usd')

  const currencyInfo = useCurrency(from);
  const options = Object.keys(currencyInfo);

  useEffect(()=>{
    convert()
  }, [amount, from, to])

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to])
  }



  return (
    <div
      className="h-screen w-full bg-cover flex justify-center items-center"
      style={{
        backgroundImage: `url(https://images.pexels.com/photos/1006060/pexels-photo-1006060.jpeg)`,
      }}
    >
      <div className="w-1/2 max-w-120 h-fit bg-white/30 shadow-[2px_2px_2px_black] rounded-md">
        <div>
          <InputBox
            label="from"
            amount={amount}
            onAmountChange={setAmount}
            amountDisable={false}
            selectedCurrency={from}
            currencyList={options}
            onCurrencyChange={setFrom}
          />
        </div>
        <div className='relative'>
          <button className="absolute left-9/20 -top-5 bg-green-500 text-white p-1 rounded-lg shadow-[1px_1px_1px_black]">swap</button>
        </div>
        <div>
          <InputBox
            label="to"
            amount={convertedAmount}
            onAmountChange={setConvertedAmount}
            amountDisable={true}
            selectedCurrency={to}
            currencyList={options}
            onCurrencyChange={setTo}
          />
        </div>
        <div className='flex justify-center'>
          <button className='bg-blue-500 text-white w-9/10 py-2 mb-2'
          onClick={() => convert()}
          >Convert {from} to {to}</button>
        </div>
      </div>
    </div>
  );
}

export default App
