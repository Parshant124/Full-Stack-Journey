import React from 'react'
import { NavLink } from 'react-router-dom'

function DashInfoCards({image, title, data, bgColor, linkTo}) {
  return (
    <NavLink to={linkTo} className='flex items-center p-4 gap-4 rounded-lg shadow-md'>
        <div className={`bg-${bgColor} p-1 rounded-full`}><img src={image} alt="" width="50px" /></div>
        <div className='flex flex-col gap-2'>
            <h4 className='text-gray-600'>{title}</h4>
            <h4 className='text-3xl font-bold'>{data}</h4>
        </div>
    </NavLink>
  )
}

export default DashInfoCards