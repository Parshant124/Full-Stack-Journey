import React from "react";
import { useParams } from "react-router-dom";
import { useAuth, useConnection, useProject, useTasks } from "../../contexts";
import { NavLink } from "react-router-dom";

function User() {
  const { userName } = useParams();
  const { Users } = useAuth();
  const userInfo = Users.find((user) => user.id === userName);
  const { connections } = useConnection();
  const { tasks } = useTasks();
  const { projects } = useProject();

  const userId = userInfo.id;

  const myConnection = connections
    .filter(
      (connection) =>
        connection.senderId === userId || connection.receiverId === userId,
    )
    .map((connection) =>
      connection.senderId === userId
        ? connection.senderId
        : connection.receiverId,
    );

  const myProjects = projects.filter(
    (project) => project.userId === userId,
  );
  const showProjects = myProjects.filter((project) => project.visibility === "Public").slice(0, 3);

  const taskCompleted = tasks.filter(
    (task) => task.userId === userId && task.completed,
  );
  return (
    <div className="p-4 bg-gray-100 h-screen">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-between border-b-2 pb-8 border-gray-300">
          <div className="flex gap-4 items-center">
            <div className="h-45 w-45 flex">
              <img
                src={
                  userInfo.image ||
                  `https://images.pexels.com/photos/13649224/pexels-photo-13649224.jpeg`
                }
                alt=""
                className="w-full h-full object-cover rounded-full border-2 p-1 border-purple-600"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div>
                <h2 className="font-bold text-3xl">{userInfo.fullName}</h2>
                <div className="flex gap-4 items-center">
                  <h4 className="text-gray-600">@{userInfo.id}</h4>
                  {userInfo.domain && <h4 className="bg-purple-200 text-purple-700 text-[14px] py-1 px-2 rounded-full">
                    {userInfo.domain}
                  </h4>}
                </div>
              </div>
              <h4 className="text-[14px]">{userInfo.bio || ""}</h4>
            </div>
          </div>
          <NavLink
            to="/setting"
            className="text-[14px] text-purple-800 border-2 border-purple-600 h-fit px-2 py-1 rounded-lg flex gap-2"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/2040/2040510.png"
              alt=""
              className="w-5 h-5"
            />
            <h4>Edit Profile</h4>
          </NavLink>
        </div>
        <div className="flex justify-around pt-4">
          <div className="flex gap-2 items-center border-r-2 w-1/3 justify-center border-gray-300">
            <div className="w-15 h-15">
              <img
                src="https://cdn-icons-png.flaticon.com/128/5675/5675392.png"
                alt=""
              />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-center">
                {myConnection.length}
              </h4>
              <h4 className="text-[14px] text-gray-600">Connections</h4>
            </div>
          </div>
          <div className="flex gap-2 items-center border-r-2 w-1/3 justify-center border-gray-300">
            <div className="w-15 h-15">
              <img
                src="https://cdn-icons-png.flaticon.com/128/12673/12673724.png"
                alt=""
              />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-center">
                {myProjects.length}{" "}
              </h4>
              <h4 className="text-[14px] text-gray-600">Projects</h4>
            </div>
          </div>
          <div className="flex gap-2 items-center w-1/3 justify-center">
            <div className="w-15 h-15">
              <img
                src="https://cdn-icons-png.flaticon.com/128/7792/7792148.png"
                alt=""
              />
            </div>
            <div>
              <h4 className="text-3xl font-bold text-center">
                {taskCompleted.length}
              </h4>
              <h4 className="text-[14px] text-gray-600">Tasks Completed</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between bg-white mt-4 px-2 py-2 shadow-md rounded-lg">
        <div className="w-1/4 flex justify-center text-purple-600 items-center gap-2">
          <div className="w-6 h-6">
            <img
              src="https://cdn-icons-png.flaticon.com/128/14627/14627400.png"
              alt=""
            />
          </div>
          <h4>Overview</h4>
        </div>
        <NavLink
          to={`/projects/${userName}`}
          className="w-1/4 flex justify-center text-gray-600 gap-2 items-center"
        >
          <div className="w-6 h-6">
            <img
              src="https://cdn-icons-png.flaticon.com/128/1420/1420462.png"
              alt=""
            />
          </div>
          <h4>Projects</h4>
        </NavLink>
        <NavLink
          to={`/tasks/${userName}`}
          className="w-1/4 flex justify-center text-gray-600 gap-2 items-center"
        >
          <div className="w-6 h-6">
            <img
              src="https://cdn-icons-png.flaticon.com/128/839/839860.png"
              alt=""
            />
          </div>
          <h4>Tasks</h4>
        </NavLink>
        <NavLink
          to={`/connections/${userName}`}
          className="w-1/4 flex justify-center text-gray-600 gap-2 items-center"
        >
          <div className="w-6 h-6">
            <img
              src="https://cdn-icons-png.flaticon.com/128/511/511587.png"
              alt=""
            />
          </div>
          <h4>Connections</h4>
        </NavLink>
      </div>
      <div className="flex py-4 gap-4">
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg flex flex-col">
          <div className="flex flex-col gap-4 border-b-2 border-gray-300 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/14627/14627400.png"
                  alt=""
                />
              </div>
              <h4 className="font-semibold text-[14px]">About me</h4>
            </div>
            <h2 className="text-[14px]">{userInfo.about}</h2>
          </div>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/5352/5352120.png"
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-[14px] font-semibold">College</h2>
                <h4 className="text-gray-600 text-[14px]">
                  {userInfo.college || "not given"}
                </h4>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/3645/3645392.png"
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-[14px] font-semibold">Education</h2>
                <h4 className="text-gray-600 text-[14px]">
                  {userInfo.course || "not given"}
                </h4>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/732/732200.png"
                  alt=""
                />
              </div>
              <div>
                <h2 className="text-[14px] font-semibold">Email</h2>
                <h4 className="text-gray-600 text-[14px]">
                  {userInfo.email || "not given"}
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 bg-white rounded-lg shadow-lg flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <div className="w-6 h-6">
              <img
                src="https://cdn-icons-png.flaticon.com/128/11471/11471391.png"
                alt=""
              />
            </div>
            <h3 className="text-[14px] font-semibold">Recent Projects</h3>
          </div>
          <div className="flex gap-6 w-full overflow-hidden">
            {showProjects.length > 0 ? (
              showProjects.map((project) => (
                <div
                  key={project.createdOn}
                  title={project.name}
                  className="flex-[0_0_calc((100%-3rem)/3)] min-w-0 flex flex-col rounded-xl overflow-hidden hover:bg-gray-200"
                >
                  <div className="w-full aspect-video overflow-hidden">
                    <img
                      src={
                        project.image ||
                        "https://images.pexels.com/photos/37893956/pexels-photo-37893956.jpeg"
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h2 className="text-lg font-bold truncate text-center">
                    {project.name}
                  </h2>

                  <h4 className="text-[14px] text-gray-600 line-clamp-2 text-center">
                    {project.desc}
                  </h4>
                </div>
              ))
            ) : (
              <h3 className="text-gray-600 text-2xl font-bold">Nothing...</h3>
            )}
          </div>
          {showProjects.length > 3 && (
            <NavLink to="/myprojects" className="flex justify-end py-2">
              <div className="flex items-center gap-2 hover:border-b-2 w-fit border-purple-400">
                <h4 className="text-[14px] text-purple-600">View all</h4>
                <div className="w-5">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/11573/11573863.png"
                    alt=""
                  />
                </div>
              </div>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default User;
