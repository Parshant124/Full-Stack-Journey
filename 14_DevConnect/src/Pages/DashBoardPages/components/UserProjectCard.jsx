import React from "react";

function UserProjectCard({ project, bookmarked }) {
  return (
    <div className="w-80 bg-red-700 p-2 flex flex-col">
      <div className="h-55 flex w-full">
        <img src={project.image} alt="" className="object-cover"/>
      </div>
      <div>
        <div>
          <h2>{project.name}</h2>
          <h4>{project.desc}</h4>
        </div>
        <div>
            {bookmarked ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
}

export default UserProjectCard;
