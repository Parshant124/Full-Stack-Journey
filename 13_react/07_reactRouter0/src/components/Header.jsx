import React from 'react'
import { Link } from 'react-router-dom'


function Header() {
  return (
    <div className='flex justify-around'>
      <h1>Header</h1>
      <Link
      to=''
      >
        Home
      </Link>
      <Link
      to='about'
      >
        About
      </Link>
      <Link
      to='contact'
      >
        Contact
      </Link>
    </div>
  )
}

export default Header