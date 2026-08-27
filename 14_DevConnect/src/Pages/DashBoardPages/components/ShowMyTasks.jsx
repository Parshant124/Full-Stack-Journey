import React, { useState, useRef, useEffect } from "react";
import { useCurrSessionUser, useCurrUser, useTasks } from "../../../contexts";

function ShowMyTasks({type}) {
  const [openTask, setOpenTask] = useState(null);
  const { tasks, toggleCompleteTask, deleteTask } = useTasks();
  const { currSessionUserId } = useCurrSessionUser();
  const { currUserId } = useCurrUser();
  const dropdownRef = useRef(null);

  let currUser = currSessionUserId || currUserId;

  const toShowCompleted = tasks.filter(
    (curr) => curr.userId === currUser && curr.completed,
  );
  const toShowProgress = tasks.filter(
    (curr) => curr.userId === currUser && !curr.completed,
  );
  const toShowAll = tasks.filter((curr) => curr.userId === currUser);

  const toShow =
    type === "All"
      ? toShowAll
      : type == "In Progress"
        ? toShowProgress
        : toShowCompleted;

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenTask(null);
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
        toShow.map((currTask) => (
          <div
            key={currTask.taskId}
            className={`${currTask.completed ? "bg-green-300" : "bg-blue-200"} flex items-center justify-around pb-8 border-b-2 p-2 border-gray-300 rounded-lg`}
          >
            <div className="flex w-2/3 gap-4">
              <input
                type="checkbox"
                checked={currTask.completed}
                onChange={() => toggleCompleteTask(currTask.taskId)}
                className="w-5"
              />
              <div>
                <h2 className="font-semibold line-clamp-1">{currTask.taskName}</h2>
                <h4 className="text-[14px] text-gray-600 line-clamp-2">
                  {currTask.taskDesc}
                </h4>
              </div>
            </div>
            <div className="flex w-1/2 justify-between items-center">
              <h4 className="text-[14px] text-gray-600">{currTask.userId}</h4>
              <h4 className="text-[14px] text-gray-600">
                {currTask.createdOn}
              </h4>

              <div
                ref={openTask === currTask.taskId ? dropdownRef : null}
                className="flex flex-col items-center relative"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/512/512222.png"
                  alt=""
                  width="16px"
                  onClick={() =>
                    setOpenTask(
                      openTask === currTask.taskId ? null : currTask.taskId,
                    )
                  }
                />

                {openTask === currTask.taskId && (
                  <div
                    className={`flex flex-col absolute top-5 right-0 text-nowrap w-35 bg-white px-2 py-2 gap-2 rounded-lg shadow-md outline-1 outline-gray-400`}
                  >
                    <button
                      onClick={() => deleteTask(currTask.taskId)}
                      className="text-red-500 flex items-center w-fit justify-between gap-2"
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                        alt=""
                        width="24px"
                      />
                      <h4>Delete Task</h4>
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

export default ShowMyTasks;
