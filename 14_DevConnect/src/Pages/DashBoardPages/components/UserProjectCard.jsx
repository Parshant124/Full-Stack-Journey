import React from "react";
import { useBookMark } from "../../../contexts";

function UserProjectCard({ project, bookmarked, userId }) {
    const {addBookMark, removeBookMark} = useBookMark()
  return (
    <div className="w-80 bg-white p-2 rounded-md shadow-lg flex flex-col gap-2">
      <div className="h-55 flex w-full">
        <img
          src={
            project.image ||
            `https://images.pexels.com/photos/30547618/pexels-photo-30547618.jpeg`
          }
          alt=""
          className="w-full h-full object-cover rounded-md shadow-md"
        />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-semibold text-lg line-clamp-1 overflow-hidden">
            {project.name}
          </h2>
          <h4 className="text-[14px] text-gray-600 line-clamp-2 overflow-hidden">
            {project.desc}
          </h4>
          <h4 className="text-[14px] text-purple-800 bg-purple-200 w-fit px-2 py-1 rounded-full">
            {project.category}
          </h4>
        </div>
        <div>
          {bookmarked ? (
            <div
              className="h-7 flex"
              onClick={() => removeBookMark(userId, project.createdOn)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/2740/2740595.png"
                alt=""
              />
            </div>
          ) : (
            <div
              className="h-7 flex"
              onClick={() => addBookMark(userId, project.createdOn)}
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/3106/3106777.png"
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProjectCard;
