import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ShowMyTasks from "./components/ShowMyTasks";

function Tasks() {
    const[showType, setShowType] = useState("All")
  
  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-100 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Tasks</h2>
          <h4 className="text-[14px] text-gray-600">
            Organize ans track your tasks.
          </h4>
        </div>
        <NavLink to="/addtask">
          <button
            className={`bg-purple-700 px-2 py-1 text-white rounded-lg flex`}
          >
            + Add Task
          </button>
        </NavLink>
      </div>
      <div className="flex justify-between">
        <div className="w-1/4 min-w-fit flex justify-between gap-2">
          <button
            className={`border-2 w-fit min-w-25 px-2 py-1 rounded-md ${showType === "All" ? "border-purple-600 text-purple-600" : "border-gray-300 text-black"}`}
            onClick={() => setShowType("All")}
          >
            All
          </button>
          <button
            className={`border-2 w-fit min-w-30 px-2 py-1 rounded-md border-gray-300 ${showType === "In Progress" ? "border-purple-600 text-purple-600" : "border-gray-300 text-black"}`}
            onClick={() => setShowType("In Progress")}
          >
            In Progress
          </button>
          <button
            className={`border-2 w-fit min-w-30 px-2 py-1 rounded-md border-gray-300 ${showType === "Completed" ? "border-purple-600 text-purple-600" : "border-gray-300 text-black"}`}
            onClick={() => setShowType("Completed")}
          >
            Completed
          </button>
        </div>
      </div>
      < ShowMyTasks type={showType} />
    </div>
  );
}

export default Tasks;
