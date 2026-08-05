import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import { useProject } from '../../contexts';
import ShowMyProjects from './components/ShowMyProjects'
import ShowSearchMyProject from './components/ShowSearchMyProject';

function My_Projects() {
  const[addingProject, setAddingProject] = useState(false)
  const[searchValue, setSearchValue] = useState("")
  const[showType, setShowType] = useState("All")

  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-100 h-full">
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
          className="border-2 px-2 py-1 text-[14px] rounded-md bg-white border-gray-300 w-1/2"
          placeholder="Search projects"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
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
        <div className='p-4'>
          {(!searchValue && <ShowMyProjects type={showType} />)}
          {(searchValue && <ShowSearchMyProject type={showType} value={searchValue} />)}
        </div>
    </div>
  );
}

export default My_Projects