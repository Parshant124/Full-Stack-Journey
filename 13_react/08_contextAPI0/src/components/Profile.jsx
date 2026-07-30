import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)
  return (
    <div>Profile {user}</div>
  )
}

export default Profile