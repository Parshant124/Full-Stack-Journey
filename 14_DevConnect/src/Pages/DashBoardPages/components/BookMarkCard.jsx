import React, { useState } from "react";
import {
  useBookMark,
  useCurrSessionUser,
  useCurrUser,
  useProject,
} from "../../../contexts";

function BookMarkCard({ projectId }) {
  const [showConfirmMsg, setShowConfirmMsg] = useState(false);
  const { projects } = useProject();
  const { removeBookMark } = useBookMark();
  const { currUserId } = useCurrUser();
  const { currSessionUserId } = useCurrSessionUser();

  const currId = currSessionUserId || currUserId;

  const currProject = projects.find(
    (project) => project.createdOn === projectId,
  );

  return (
    <div>
      {currProject && (
        <div className="p-2 flex items-center border-b border-gray-300 pb-6 justify-between relative">
          <div className="flex items-center gap-4">
            <div className="bg-purple-200 p-1 rounded-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/256/6596/6596459.png"
                alt=""
                width="35px"
              />
            </div>
            <div>
              <h2 className="font-semibold text-[14px]">
                {currProject[0].name}
              </h2>
              <h4 className="text-gray-600 text-[14px]">
                {currProject[0].desc}
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-4 w-1/3 justify-between">
            <div className="w-1/4">
              <h4 className="text-gray-600 px-2 py-1 text-[14px] rounded-md">
                {currProject[0].userId}
              </h4>
            </div>
            <div className="w-1/2">
              <h4 className="bg-purple-200 w-fit text-purple-800 text-[14px] px-2 py-1 rounded-md">
                {currProject[0].category}
              </h4>
            </div>
            <div
              onClick={() => setShowConfirmMsg(true)}
              className="cursor-pointer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/4942/4942539.png"
                alt=""
                width="25px"
              />
            </div>
          </div>
          <div
            className={`${showConfirmMsg ? "flex" : "hidden"} absolute w-full h-screen justify-center items-center flex-col`}
          >
            <div className="w-50 text-center bg-white font-semibold p-2 text-[14px] rounded-lg shadow-lg">
              <h2>Are you Sure to remove the BookMark?</h2>
              <div className="flex justify-around">
                <button
                  className="bg-red-600 text-white px-1 py-0.5 w-10"
                  onClick={() =>
                    removeBookMark(currId, currProject[0].createdOn)
                  }
                >
                  Yes
                </button>
                <button
                  className="bg-purple-600 text-white px-1 py-0.5 w-10"
                  onClick={() => setShowConfirmMsg(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookMarkCard;
