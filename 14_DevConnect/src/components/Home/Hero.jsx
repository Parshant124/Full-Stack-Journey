import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="flex xl:flex-row flex-col w-full px-14 py-14 justify-around cursor-default gap-10 xl:gap-0">
      <div className="xl:w-1/3 flex flex-col gap-4">
        <div>
          <h4 className="text-[10px] font-medium text-purple-800 bg-purple-200 w-fit px-2 py-1 rounded-full">
            Built for Developers
          </h4>
        </div>
        <div>
          <h1 className="text-5xl font-bold">
            Build, Collaborate, Ship Faster.
          </h1>
        </div>
        <div>
          <h4 className="">
            DevConnect helps developers manage projects, collaborate with
            teammates, and showcase their work in one place
          </h4>
        </div>
        <div className="flex w-full gap-6">
          <Link
            to="login"
            className="w-1/4 py-2.5 bg-purple-700 text-[12px] font-medium text-white shadow-lg shadow-black/40 flex justify-center"
          >
            <button className="">Get Started</button>
          </Link>
          <Link
            to="login"
            className="w-1/4 py-2.5 text-[12px] font-medium text-black shadow-lg shadow-black/40 flex justify-center"
          >
            <button>Explore Project</button>
          </Link>
        </div>
      </div>
      <div className="xl:w-1/2 md:flex hidden min-h-80 shadow-2xl shadow-purple-300 border-2 border-black/10 rounded-lg">
        <div className="w-1/5 flex flex-col border-[0px_1px_0px_0px] border-black/10">
          <div className="h-1/7 w-full flex justify-center items-center border-[0px_0px_1px_0px] border-black/10">
            <img src=".\src\assets\DevConnect.png" alt="" width="120px" />
          </div>
          <div className="flex flex-col gap-3 px-2 pt-4">
            <div className="flex items-center gap-2 bg-purple-200 text-purple-700 text-[12px] font-medium py-1 rounded-md px-2">
              <img
                src="https://www.svgrepo.com/show/451007/knowledge-graph-dashboard.svg"
                alt=""
                width="20px"
                className=""
              />
              <h4>Dashboard</h4>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium py-1 px-2 text-black/70">
              <img
                src="https://www.svgrepo.com/show/535397/folder-open.svg"
                alt=""
                width="20px"
                className=""
              />
              <h4>Projects</h4>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium py-1 px-2 text-black/70">
              <img
                src="https://www.svgrepo.com/show/509266/task.svg"
                alt=""
                width="18px"
              />
              <h4>Tasks</h4>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium py-1 px-2 text-black/70">
              <img
                src="https://www.svgrepo.com/show/484029/team.svg"
                alt=""
                width="20px"
              />
              <h4>Team</h4>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium py-1 px-2 text-black/70">
              <img
                src="https://www.svgrepo.com/show/533270/message-square-lines-alt.svg"
                alt=""
                width="20px"
              />
              <h4>Messages</h4>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium py-1 px-2 text-black/70">
              <img
                src="https://www.svgrepo.com/show/524954/settings.svg"
                alt=""
                width="20px"
              />
              <h4>Settings</h4>
            </div>
          </div>
        </div>
        <div className="w-4/5 flex flex-col bg-gray-100">
          <div className="p-4 w-full flex flex-col gap-4">
            <h2 className="text-lg font-medium">Dashboard</h2>
            <div className="flex justify-around w-full ">
              <div className="w-1/4 bg-white px-3 py-4 rounded-md shadow-lg">
                <h4 className="text-[12px] font-medium text-gray-500">
                  Total Projects
                </h4>
                <h2 className="text-xl font-bold">12</h2>
              </div>
              <div className="w-1/4 bg-white px-3 py-4 rounded-md shadow-lg">
                <h4 className="text-[12px] font-medium text-gray-500">
                  Completed
                </h4>
                <h2 className="text-xl font-bold">8</h2>
              </div>
              <div className="w-1/4 bg-white px-3 py-4 rounded-md shadow-lg">
                <h4 className="text-[12px] font-medium text-gray-500">
                  Pending
                </h4>
                <h2 className="text-xl font-bold">4</h2>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col p-4">
            <h2 className="text-lg font-medium">Recent Projects</h2>
            <div className="bg-white rounded-lg shadow-lg px-2 py-2 flex flex-col gap-4">
              <div className="flex gap-3 border-[0px_0px_1px_0px] border-black/20 py-3">
                <div className="flex items-center justify-center w-1/12 bg-purple-400 rounded-xl">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6213/6213731.png"
                    alt=""
                    width="25px"
                  />
                </div>
                <div className="w-4/5">
                  <h4 className="font-medium">Portfolio Website</h4>
                  <h4 className="text-[12px] font-medium text-gray-500">
                    Updated 2h ago
                  </h4>
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://www.svgrepo.com/show/521479/arrow-next-small.svg"
                    alt=""
                    width="20px"
                  />
                </div>
              </div>
              <div className="flex gap-3 border-[0px_0px_1px_0px] border-black/20 pb-3">
                <div className="flex items-center justify-center w-1/12 bg-orange-800 rounded-xl">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/14511/14511643.png"
                    alt=""
                    width="30px"
                  />
                </div>
                <div className="w-4/5">
                  <h4 className="font-medium">AI Chatbot</h4>
                  <h4 className="text-[12px] font-medium text-gray-500">
                    Updated 5h ago
                  </h4>
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://www.svgrepo.com/show/521479/arrow-next-small.svg"
                    alt=""
                    width="20px"
                  />
                </div>
              </div>
              <div className="flex gap-3 pb-2">
                <div className="flex items-center justify-center w-1/12 bg-yellow-300 rounded-xl">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/18598/18598391.png"
                    alt=""
                    width="25px"
                  />
                </div>
                <div className="w-4/5">
                  <h4 className="font-medium">Expense Tracker</h4>
                  <h4 className="text-[12px] font-medium text-gray-500">
                    Updated 1d ago
                  </h4>
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://www.svgrepo.com/show/521479/arrow-next-small.svg"
                    alt=""
                    width="20px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
