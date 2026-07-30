import React from 'react'
import { NavLink } from 'react-router-dom';

function DashTasks() {
  return (
    <div className="p-4 ">
      <div className="flex justify-between">
        <h4 className="font-semibold">Upcoming Tasks</h4>
        <NavLink to="/tasks">
            <h4 className="font-semibold text-purple-600">View all</h4>
        </NavLink>
      </div>
    </div>
  );
}

export default DashTasks