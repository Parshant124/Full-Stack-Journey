import React from "react";
import { useParams } from "react-router-dom";
import { useBookMark, useProject } from "../../contexts";
import UserProjectCard from "./components/UserProjectCard";

function UserProject() {
  const { projects } = useProject();
  const { userName } = useParams();
  const { bookmarks } = useBookMark();
  const userProjects = projects.filter(
    (project) => project.userId === userName && project.visibility === "Public",
  );


  return (
    <div>
      {userProjects.length > 0
        ? userProjects.map((project) => (
            <div className="flex flex-row">
                <UserProjectCard project={project}/>
            </div>
          ))
        : "NOTHING"}
    </div>
  );
}

export default UserProject;
