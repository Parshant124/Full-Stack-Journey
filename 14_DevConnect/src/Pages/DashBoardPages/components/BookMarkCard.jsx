import React from 'react'
import { useProject } from '../../../contexts'

function BookMarkCard({projectId}) {
    const{projects} = useProject()

    const currProject = projects.filter((project) => project.createdOn === projectId)
  return (
    <div>{currProject[0].name}</div>
  )
}

export default BookMarkCard