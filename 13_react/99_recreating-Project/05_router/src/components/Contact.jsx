import React from 'react'
import { useParams } from 'react-router-dom'

function Contact() {
    const {contactId} = useParams()
  return (
    <div>Contact : {contactId}</div>
  )
}

export default Contact