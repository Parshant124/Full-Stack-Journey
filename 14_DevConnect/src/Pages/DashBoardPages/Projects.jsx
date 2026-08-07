import React, { useState } from "react";
import { useAuth, useBookMark, useCurrSessionUser, useCurrUser, useProject } from "../../contexts";
import SeachProject from "./components/SeachProject";
import ShowProject from "./components/ShowProject";

function Projects() {
  const [searchValue, setSearchValue] = useState("")
  const { projects } = useProject();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const { Users } = useAuth();
  const { bookmarks, addBookMark, removeBookMark } = useBookMark()

  const currId = currSessionUserId || currUserId;

  const showProjects = projects.filter((project) => project.userId !== currId && project.visibility === "Public");
  
  const ownerFullName = (userId) => {
    const userInfo = Users.filter((user) => user.id === userId)

    return userInfo[0].fullName
  }

  const checkBookMarked = (projectId) => {
    const exist = bookmarks.filter(
      (prev) => prev.user === currId && prev.project === projectId,
    );

    return exist.length > 0 ? true : false;
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
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search projects..."
          className=" text-[14px] border-2 border-gray-300 px-2 py-1 rounded-lg w-1/3"
        />
      </div>
      <div>
        {searchValue && <SeachProject value={searchValue} />}
        {!searchValue && <ShowProject />}
      </div>
    </div>
  );
}

export default Projects;
