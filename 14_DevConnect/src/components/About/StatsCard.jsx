import React from 'react'

function StatsCard({title, titleColor, desc}) {
  return (
    <div className='flex flex-col items-center gap-1 py-2'>
      <h2 className={`text-${titleColor}-600 text-2xl font-bold`}>{title}</h2>
      <h4 className='text-[14px]'>{desc}</h4>
    </div>
  )
}

export default StatsCard