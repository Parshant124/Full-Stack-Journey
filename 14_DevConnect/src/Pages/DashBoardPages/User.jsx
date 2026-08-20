import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {userName} = useParams();
  return (
    <div>User</div>
  )
}

export default User