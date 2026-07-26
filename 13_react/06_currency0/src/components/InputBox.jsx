import React from 'react'

function InputBox({
    label,
    amount = 0 ,
    onAmountChange,
    amountDisable,
    selectedCurrency,
    currencyList,
    onCurrencyChange
}) {
  return (
    <div className="flex p-2  gap-4 justify-between bg-gray-400 m-4 rounded-lg">
      <div className="flex flex-col w-1/3">
        <label className="text-white">{label}</label>
        <input
          type="number"
          placeholder={amount || 0}
          className="bg-white rounded px-2"
          disabled={amountDisable}
          onChange={(e) => onAmountChange(Number(e.target.value))}
        />
      </div>
      <div className="flex flex-col w-1/3 text-right">
        <label className="text-white">Currency Type</label>
        <select
        className="bg-white rounded text-black"
        value={selectedCurrency}
        disabled={false}
        onChange={(e)=> onCurrencyChange(e.target.value)}
        >
            {currencyList.map((currency) => <option value={currency} key={currency}>{currency}</option>)}
        </select>
      </div>
    </div>
  );
}

export default InputBox