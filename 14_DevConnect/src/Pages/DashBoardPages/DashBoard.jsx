import React from 'react'
import { useCurrSessionUser } from '../../contexts';
import DashInfoCards from './components/DashInfoCards';
import DashGraph from './components/DashGraph';
import DashTasks from './components/DashTasks';

function DashBoard() {
  const {currSessionUserFullName} = useCurrSessionUser()
  const firstWord = currSessionUserFullName.substring(0, currSessionUserFullName.indexOf(" ") === -1 ? currSessionUserFullName.length : currSessionUserFullName.indexOf(" "));
  return (
    <div className="overflow-y-auto h-full p-4 gap-6 flex flex-col bg-gray-50">
      <div
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/7135053/pexels-photo-7135053.jpeg)`,
        }}
        className="w-full h-40 flex items-center p-4 justify-between rounded-lg shadow-lg"
      >
        <div>
          <h2 className="font-bold text-2xl">Welcome back,{firstWord}</h2>
          <h4 className="text-[14px] text-gray-600">
            Let's build something important today.
          </h4>
        </div>
        <div className="">
          <img
            src="https://cdn-icons-png.flaticon.com/256/11933/11933140.png"
            alt=""
            className="h-35"
          />
        </div>
      </div>
      <div className="flex gap-4 py-4 justify-between">
        <DashInfoCards
          image="https://cdn-icons-png.flaticon.com/256/7457/7457274.png"
          title="Total Projects"
          data="12"
          bgColor="purple-200"
          linkTo="/myprojects"
        />
        <DashInfoCards
          image="https://cdn-icons-png.flaticon.com/256/7457/7457274.png"
          title="Task Completed"
          data="34"
          bgColor="green-200"
          linkTo="/tasks"
        />
        <DashInfoCards
          image="https://cdn-icons-png.flaticon.com/256/7457/7457274.png"
          title="Task Pending"
          data="3"
          bgColor="blue-200"
          linkTo="/tasks"
        />
        <DashInfoCards
          image="https://cdn-icons-png.flaticon.com/256/7457/7457274.png"
          title="Connections"
          data="128"
          bgColor="orange-200"
          linkTo="/connections"
        />
      </div>
      <div className="w-full h-full flex gap-4">
        <div className="w-3/5 shadow-md h-full rounded-lg bg-white">
          {" "}
          <DashGraph />{" "}
        </div>
        <div className="w-2/5 shadow-md h-full rounded-lg bg-white">
          {" "}
          <DashTasks />{" "}
        </div>
      </div>
    </div>
  );
}

export default DashBoard