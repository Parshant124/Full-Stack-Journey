import React, { useState } from 'react'
import {NavLink} from 'react-router-dom'
import { useProject } from '../../contexts';
import ShowMyProjects from './components/ShowMyProjects'

function My_Projects() {
  const[addingProject, setAddingProject] = useState(false)
  const[showType, setShowType] = useState("All")

  return (
    <div className="p-6 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">My Projects</h2>
          <h4 className="text-[14px] text-gray-600">
            Manage and track all your projects.
          </h4>
        </div>
        <NavLink to="/addproject">
          <button
            className={`bg-purple-700 px-2 py-1 text-white rounded-lg ${addingProject ? "hidden" : "flex"}`}
            onClick={() => setAddingProject(true)}
          >
            + New Project
          </button>
        </NavLink>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          className="border-2 px-2 py-1 text-[14px] rounded-md border-gray-300 w-1/2"
          placeholder="Search projects"
        />
        <div className="flex gap-6">
          <button
            className={`border-2 w-fit px-2 py-1 rounded-md ${showType === "All" ? "border-purple-600 text-purple-600" : "border-gray-300 text-black"}`}
            onClick={()=>setShowType("All")}
          >
            All
          </button>
          <button className={`border-2 w-fit px-2 py-1 rounded-md border-gray-300 ${showType === "In Progress" ? "border-purple-600 text-purple-600" : "border-gray-300 text-black"}`}
          onClick={()=>setShowType("In Progress")}
          >
            In Progress
          </button>
          <button className={`border-2 w-fit px-2 py-1 rounded-md border-gray-300 ${showType === "Completed" ? "border-purple-600 text-purple-600" : "border-gray-300 text-black"}`}
          onClick={()=>setShowType("Completed")}
          >
            Completed
          </button>
        </div>
      </div>
        <div>
          <ShowMyProjects type={showType} />
        </div>
    </div>
  );
}

export default My_Projects