import React from 'react'
import { NavLink } from 'react-router-dom';
import { useCurrSessionUser, useCurrUser, useTasks } from '../../../contexts';

function DashTasks() {
  const {tasks} = useTasks();
  const {currUserId} = useCurrUser();
  const {currSessionUserId} = useCurrSessionUser();
  
  const currId = currSessionUserId || currUserId;

  const myTasks = tasks.filter((task) => task.userId === currId && !task.completed)

  const showTasks = myTasks.slice(0, 4);
  return (
    <div className="p-4 h-full">
      <div className="flex justify-between">
        <h4 className="font-semibold">Upcoming Tasks</h4>
        <NavLink to="/tasks">
          <h4 className="font-semibold text-purple-600">View all</h4>
        </NavLink>
      </div>
      <div className="w-full h-full pt-4">
        {showTasks.length ? (
          
            showTasks.map((task) => <NavLink to="/tasks" className='flex justify-between py-2 border-b-2 border-gray-300 mb-2'>
              <h4 className='text-[18px]'>{task.taskName}</h4>
              <h4 className='text-[14px] text-gray-600'>{task.createdOn}</h4>
            </NavLink>)
          
        ) : (
          <div className="w-full h-[80%] flex justify-center items-center">
            <h4 className='text-3xl text-center font-bold text-gray-400'> NO Tasks </h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashTasks