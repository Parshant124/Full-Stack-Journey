import React from "react";
import { useBookMark, useCurrSessionUser, useCurrUser } from "../../../contexts";

function ExploreProjectCard({ project, bookmarked }) {
  const { addBookMark, removeBookMark } = useBookMark();
  const {currSessionUserId} = useCurrSessionUser();
  const {currUserId} = useCurrUser();

  const userId = currSessionUserId || currUserId;
  return (
    <div className="flex justify-between items-center pt-4 pb-4 border-b-2 border-gray-300">
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 flex">
          <img
            src={
              project.image ||
              "https://cdn-icons-png.flaticon.com/128/9672/9672290.png"
            }
            alt=""
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div>
          <h2 className="text-[14px] font-semibold">{project.name}</h2>
          <h4 className="text-[14px] text-gray-600">{project.desc}</h4>
        </div>
      </div>
      <div>
        {bookmarked && (
          <button
            className="h-6 w-6 flex"
            onClick={() => removeBookMark(userId, project.createdOn)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/102/102279.png"
              alt=""
              className="w-full h-full"
            />
          </button>
        )}
        {!bookmarked && (
          <button
            className="h-6 w-6 flex"
            onClick={() => addBookMark(userId, project.createdOn)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/25/25667.png"
              alt=""
              className="w-full h-full"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default ExploreProjectCard;
