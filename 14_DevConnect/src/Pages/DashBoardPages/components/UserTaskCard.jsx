import React from 'react'

function UserTaskCard({task}) {
  return (
    <div className={`flex justify-between p-4 ${task.completed ? "bg-green-300" : "bg-red-300"} rounded-md items-center`}>
      <div className='w-2/3'>
        <h2 className='text-xl font-semibold'>{task.taskName}</h2>
        <h4 className='text-[14px] text-gray-600'>{task.taskDesc}</h4>
      </div>
      <div className='w-1/3 flex justify-between'>
        <h3 className='text-purple-600'>{task.creator}</h3>
        <h3>{task.createdOn}</h3>
      </div>
    </div>
  );
}

export default UserTaskCard