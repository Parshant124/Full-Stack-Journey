import React from "react";
import { useAuth, useCurrSessionUser, useCurrUser, useProject } from "../../contexts";

function Projects() {
  const { projects } = useProject();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const { Users } = useAuth();

  const currId = currSessionUserId || currUserId;

  const showProjects = projects.filter((project) => project.userId !== currId);
  
  const ownerFullName = (userId) => {
    const userInfo = Users.filter((user) => user.id === userId)

    return userInfo[0].fullName
  }
  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-100 h-fit min-h-full">
      <div>
        <h2 className="font-bold text-2xl">Projects</h2>
        <h4 className="text-[14px] text-gray-600">
          Discover amazing projects from the community.
        </h4>
      </div>
      <div>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search projects..."
          className=" text-[14px] border-2 border-gray-300 px-2 py-1 rounded-lg w-1/3"
        />
      </div>
      <div className="flex gap-4 flex-wrap justify-between">
        {showProjects.map((project) => (
          <div className="bg-white p-8 w-[30%] h-90 min-h-fit rounded-lg shadow-lg flex flex-col gap-4">
            <div className="flex justify-center">
              <img
                src="https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?_gl=1*etdg79*_ga*NzY2MzQyMzk1LjE3NjE3NTY5ODI.*_ga_8JE65Q40S6*czE3ODYwMTM3ODIkbzE2JGcxJHQxNzg2MDEzODI0JGoxOCRsMCRoMA.."
                alt=""
                className="w-fit h-50 object-fill"
              />
            </div>
            <div className="flex justify-between">
              <div>
                <h2 className="font-semibold">{project.name}</h2>
                <h4 className="text-[14px] text-gray-600">{project.desc}</h4>
              </div>
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/25/25667.png"
                  alt=""
                  width="20px"
                />
              </div>
            </div>
            <div>
              <h4 className="text-[14px]">Creator : <span className="text-purple-600">{ownerFullName(project.userId)}</span></h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
