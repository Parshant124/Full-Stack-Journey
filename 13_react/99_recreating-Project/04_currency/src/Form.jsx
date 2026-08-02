import React from 'react'

function Form({
    label, amount, setAmount, disableAmount, currency, currencyList, changeCurrency
}) {
  return (
    <div className="flex w-full justify-between bg-gray-600 p-2 rounded my-2">
      <div className="flex flex-col">
        <label htmlFor="" className="text-white">
          {label}
        </label>
        <input
          type="number"
          name=""
          id=""
          className="bg-white px-2 rounded"
          placeholder="0.00"
          value = {amount}
          readOnly = {disableAmount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="text-white">
          Currency Type
        </label>
        <select name="" id="" className="bg-white rounded px-2" 
        value={currency} 
        onChange={(e) => changeCurrency(e.target.value)}>
            {currencyList.map((curr) => (
                <option value={curr} key={curr}>
                    {curr}
                </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default Form