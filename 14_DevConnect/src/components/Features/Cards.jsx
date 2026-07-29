import React from 'react'

function Cards({iconBg, icon, imgDisplay, title, desc}) {
  return (
    <div className='border-2 rounded-lg border-gray-300 shadow-md h-100 w-80 py-4 px-6 flex flex-col gap-4'>
      <div className={`bg-${iconBg} w-fit rounded-full p-2`}><img src={icon} alt="" width="40px"/></div>
      <div><img src={imgDisplay} alt="" className='rounded-xl max-h-35' /></div>
      <h2 className='font-bold text-[18px]'>{title}</h2>
      <h4 className='font-medium text-[14px] text-gray-600'>{desc}</h4>
    </div>
  )
}

export default Cards