import React, { useContext } from 'react'
import UserContext from '../context/UserContext'

function Profile() {
    const {user} = useContext(UserContext)
    if(!user || user.username === "") return(<h1>NOT LOGGED IN</h1>)
  return (
    <div>Profile : {user.username}</div>
  )
}

export default Profile