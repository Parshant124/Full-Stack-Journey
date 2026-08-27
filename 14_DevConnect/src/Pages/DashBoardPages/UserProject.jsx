import React from "react";
import { useParams } from "react-router-dom";
import { useAuth, useBookMark, useCurrSessionUser, useCurrUser, useProject } from "../../contexts";
import UserProjectCard from "./components/UserProjectCard";

function UserProject() {
  const { projects } = useProject();
  const { userName } = useParams();
  const { bookmarks } = useBookMark();
  const {currSessionUserId} = useCurrSessionUser();
  const {currUserId} = useCurrUser();
  const {Users} = useAuth();

  const userId = currSessionUserId || currUserId;
  const userInfo = Users.find((user) => user.id === userName);

  const userProjects = projects.filter(
    (project) => project.userId === userName && project.visibility === "Public",
  );
  const myBookMarks = bookmarks
    .filter((bookmark) => bookmark.user === userId)
    .map((bookmark) => bookmark.project);

  return (
    <div className="flex flex-col h-full min-h-fit">
      <div className="bg-white p-4 shadow-lg">
        <h2 className="text-2xl font-bold">
          <span className="text-purple-600">{userInfo.fullName}'s</span> Projects
        </h2>
        <h4 className="text-[14px] text-gray-600">These are the projects previews created by the user.</h4>
      </div>
      <div className="bg-gray-50 w-full h-full flex flex-wrap justify-around">
        {userProjects.length > 0
          ? userProjects.map((project) => (
              <div className="p-4">
                <UserProjectCard
                  project={project}
                  bookmarked={myBookMarks.includes(project.createdOn)}
                  userId={userId}
                />
              </div>
            ))
          : "NOTHING"}
      </div>
    </div>
  );
}

export default UserProject;
