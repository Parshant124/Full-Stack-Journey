import React, { useState, useRef, useEffect } from "react";
import { useCurrSessionUser, useCurrUser, useProject } from "../../../contexts";

function ShowMyProjects({ type }) {
  const [openProject, setOpenProject] = useState(null);
  const { projects, toggleComplete, deleteProject } = useProject();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const dropdownRef = useRef(null);

  let currUser = currSessionUserId || currUserId;

  const toShowCompleted = projects.filter(
    (curr) => curr.userId === currUser && curr.completed,
  );
  const toShowProgress = projects.filter(
    (curr) => curr.userId === currUser && !curr.completed,
  );
  const toShowAll = projects.filter((curr) => curr.userId === currUser);

  const toShow =
    type === "All"
      ? toShowAll
      : type == "In Progress"
        ? toShowProgress
        : toShowCompleted;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenProject(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-8">
      {toShow.length == 0 ? (
        <div className="h-full w-full text-center text-3xl">
          {" "}
          Nothing to show{" "}
        </div>
      ) : (
        toShow.map((currProject) => (
          <div
            key={currProject.createdOn}
            className="flex items-center justify-around pb-8 border-b-2 border-gray-300"
          >
            <div className="flex w-2/3 gap-4">
              <div className="bg-purple-900 p-1 rounded">
                <img
                  src={
                    currProject.image ||
                    `https://cdn-icons-png.flaticon.com/128/2241/2241791.png`
                  }
                  alt=""
                  width="40px"
                />
              </div>
              <div>
                <h2 className="font-semibold">{currProject.name}</h2>
                <h4 className="text-[14px] text-gray-600">
                  {currProject.desc}
                </h4>
              </div>
            </div>
            <div className="flex w-1/3 justify-between items-center">
              {currProject.completed ? (
                <h4 className="text-[14px] text-green-700 bg-green-100 px-2 py-1 rounded-lg">
                  Completed
                </h4>
              ) : (
                <h4 className="text-[14px] text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">
                  In Progress
                </h4>
              )}
              <h4 className="text-[14px] text-gray-600">
                {" "}
                {currProject.visibility}{" "}
              </h4>
              <div
                ref={openProject === currProject.name ? dropdownRef : null}
                className="flex flex-col items-center relative"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/512/512222.png"
                  alt=""
                  width="16px"
                  onClick={() =>
                    setOpenProject(
                      openProject === currProject.name
                        ? null
                        : currProject.name,
                    )
                  }
                />

                {openProject === currProject.name && (
                  <div
                    className={`flex flex-col absolute top-5 right-0 text-nowrap bg-white px-2 py-2 gap-2 rounded-lg shadow-md outline-1 outline-gray-400`}
                  >
                    <button
                      onClick={() =>
                        toggleComplete(currProject.userId, currProject.createdOn)
                      }
                      className="border-b-2 border-gray-400 pb-2"
                    >
                      {currProject.completed ? (
                        <span className="text-blue-600">Mark as Incompleted</span>
                      ) : (
                        <span className="text-green-800">Mark as Completed</span>
                      )}
                    </button>
                    <button
                      onClick={() =>
                        deleteProject(currProject.userId, currProject.createdOn)
                      }
                      className="text-red-500"
                    >
                      Delete Project
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ShowMyProjects;
