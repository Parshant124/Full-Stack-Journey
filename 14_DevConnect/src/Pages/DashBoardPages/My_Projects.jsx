import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'

function My_Projects() {
  const[addingProject, setAddingProject] = useState(false)
  return (
    <div className="p-6">
      <div className='flex justify-between items-center'>
        <div>
          <h2 className="text-2xl font-bold">My Projects</h2>
          <h4 className='text-[14px] text-gray-600'>Manage and track all your projects.</h4>
        </div>
        <NavLink to="/addproject">
          <button className={`bg-purple-700 px-2 py-1 text-white rounded-lg ${addingProject ? "hidden" : "flex"}`}
            onClick={() => setAddingProject(true)}
          >+ New Project</button>
        </NavLink>
      </div>
    </div>
  );
}

export default My_Projects