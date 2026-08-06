import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  useCurrSessionUser,
  useCurrUser,
  useProject,
  useTasks
} from "../../../contexts";

function AddTask() {
  const [name, setName] = useState("");
  const [validName, setValidName] = useState(true);
  const [desc, setDesc] = useState("");
  const [validDesc, setValidDesc] = useState(true);
  const [cancel, setCancel] = useState(false);
  const navigate = useNavigate();
  const {addTasks} = useTasks()
    const { currSessionUserId, currSessionUserFullName } = useCurrSessionUser();
    const { currUserId, currUserFullName } = useCurrUser();

  const handleCancel = () => {
    setName("");
    setDesc("");
    navigate("/tasks");
  };
  const handleName = (nameInput) => {
    if (nameInput === "") {
      setValidName(false);
      return false;
    } else {
      setValidName(true);
      return true;
    }
  };

  const handleDesc = (descInput) => {
    if (descInput === "") {
      setValidDesc(false);
      return false;
    } else {
      setValidDesc(true);
      return true;
    }
  };

  const handleCreate = () => {
    let validateDesc = handleDesc(desc);
    let validateName = handleName(name);

    if (!validateDesc || !validateName) {
        console.log("returned")
      return;
    }

    const today = new Date();
    const formattedDate = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;

    const task = {
      userId: currSessionUserId || currUserId,
      taskId: Date.now(),
      taskName: name,
      taskDesc: desc,
      creator: currSessionUserFullName || currUserFullName,
      completed: false,
      createdOn: formattedDate,
    };

    addTasks(task);
    navigate("/tasks");
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2">
        <div>
          <NavLink to="/tasks" className="text-[14px] text-gray-600">
            Tasks {">"}
          </NavLink>
          <NavLink to="#" className="text-[14px] font-medium text-purple-600">
            {" "}
            Add Task
          </NavLink>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Add Task</h2>
          <h4 className="text-[14px] text-gray-600">
            Create a new task for your project
          </h4>
        </div>
      </div>
      <div className="w-full flex flex-col h-full shadow-lg bg-white rounded-lg p-4 gap-4">
        <div className="w-1/2 flex flex-col">
          <label className="text-[14px] font-semibold">
            Project Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`text-[14px] border-2 p-1 rounded ${validName ? "border-gray-300" : "border-red-500"} `}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-[14px] font-semibold">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Enter task desciption..."
            className={`text-[14px] border-2 p-1 rounded ${validDesc ? "border-gray-300" : "border-red-500"}`}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={10}
          ></textarea>
        </div>
        <div className="flex justify-end gap-4">
          <button
            className="border-2 px-4 py-1.5 text-[13px] border-gray-300 bg-white text-black rounded-md transition hover:border-purple-600 hover:bg-purple-600 hover:text-white"
            onClick={() => setCancel(true)}
          >
            Cancle
          </button>
          <button
            className="border-2 px-4 py-1.5 text-[13px] border-purple-600 bg-purple-600 text-white rounded-md transition hover:border-gray-300 hover:bg-white hover:text-black"
            onClick={handleCreate}
          >
            Create Task
          </button>
        </div>
        <div
          className={`${cancel ? "block" : "hidden"} absolute w-full h-full flex justify-center items-center bg-black/10 top-0 left-0`}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-black text-3xl font-bold">Are you Sure?</h2>
            <div className="flex justify-between p-4">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md flex flex-col"
                onClick={handleCancel}
              >
                Yes <span className="text-[12px]">{"(Cancel)"}</span>
              </button>
              <button
                className="bg-purple-600 text-white px-2 py-1 rounded-md flex flex-col"
                onClick={() => setCancel(false)}
              >
                No <span className="text-[12px]">{"(Stay)"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTask;
