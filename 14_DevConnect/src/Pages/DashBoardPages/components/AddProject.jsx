import React from "react";
import { NavLink } from "react-router-dom";

function AddProject() {
  return (
    <div className="flex p-6 flex-col gap-6 w-full h-fit min-h-full bg-gray-50">
      <div className="flex flex-col gap-2">
        <div>
          <NavLink to="/myprojects" className="text-[14px] text-gray-600">
            My Projects {">"}
          </NavLink>
          <NavLink to="/addproject" className="text-[14px] font-medium text-purple-600">
            {" "}
            Add Project
          </NavLink>
        </div>
        <div>
          <h2 className="text-2xl font-bold">Add Project</h2>
          <h4 className="text-[14px] text-gray-600">
            Create a new project and start collaborating.
          </h4>
        </div>
      </div>
      <div className="w-full flex flex-col h-full shadow-lg bg-white rounded-lg p-4 gap-4">
        <h2 className="font-semibold text-[15px]">Project Details</h2>
        <div className="flex justify-between w-full gap-4">
          <div className="w-1/2 flex flex-col">
            <label className="text-[14px] font-semibold">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. DevConnect Web App"
              className="text-[14px] border-2 p-1 rounded border-gray-300"
            />
          </div>
          <div className="w-1/2 flex flex-col">
            <label className="text-[14px] font-semibold">
              Project Key{" "}
              <span className="text-gray-500 font-medium">{"(Optional)"}</span>
            </label>
            <input
              type="text"
              placeholder="e.g. DEVCONN"
              className="text-[14px] border-2 p-1 rounded border-gray-300"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-[14px] font-semibold">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Describe your project, its purpose and goals..."
            className="text-[14px] border-2 p-1 rounded border-gray-300"
            rows={6}
          ></textarea>
        </div>
        <div className="flex gap-4">
          <div className="w-1/2 flex flex-col">
            <label className="text-[14px] font-semibold">
              Category <span className="text-red-500">*</span>
            </label>
            <select className="text-[14px] border-2 p-1 rounded border-gray-300">
              <option value="">Select a category</option>
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>Desktop Application</option>
              <option>AI / Machine Learning</option>
              <option>Data Science</option>
              <option>Cybersecurity</option>
              <option>Blockchain / Web3</option>
              <option>Game Development</option>
              <option>UI / UX Design</option>
              <option>DevOps & Cloud</option>
              <option>IoT / Embedded Systems</option>
              <option>API / Backend</option>
              <option>Database</option>
              <option>Automation / Scripting</option>
              <option>Open Source</option>
              <option>Research</option>
              <option>Education</option>
              <option>Productivity</option>
              <option>E-commerce</option>
              <option>Social Platform</option>
              <option>Healthcare</option>
              <option>Finance / FinTech</option>
              <option>Entertainment</option>
              <option>Portfolio</option>
              <option>Other</option>
            </select>
          </div>
          <div className="w-1/2 flex flex-col">
            <label className="text-[14px] font-semibold">
              Visibility <span className="text-red-500">*</span>
            </label>
            <select className="text-[14px] border-2 p-1 rounded border-gray-300">
              <option value="private" key="private">
                Private
              </option>
              <option value="public" key="public">
                Public
              </option>
            </select>
          </div>
        </div>
        <div className="w-full">
          <label className="mb-2 block text-sm font-semibold text-gray-800">
            Project Image{" "}
            <span className="text-gray-500 font-medium">(Optional)</span>
          </label>

          <label className="flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/30 transition hover:border-indigo-500 hover:bg-indigo-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="mb-4 h-12 w-12 text-indigo-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16V4m0 0-4 4m4-4 4 4M5 16.5A3.5 3.5 0 0 0 8.5 20h7A3.5 3.5 0 0 0 19 16.5"
              />
            </svg>

            <p className="text-lg font-medium text-gray-700">
              Drag & drop an image here
            </p>

            <p className="mt-1 text-sm text-gray-500">
              or{" "}
              <span className="font-semibold text-indigo-600">
                click to upload
              </span>
            </p>

            <p className="mt-2 text-xs text-gray-400">
              PNG, JPG, JPEG, WEBP (Max 2 MB)
            </p>
          </label>

          <input
            id="projectImage"
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button className="border-2 px-4 py-1.5 text-[13px] border-gray-300 bg-white text-black rounded-md transition hover:border-purple-600 hover:bg-purple-600 hover:text-white">
            Cancle
          </button>
          <button className="border-2 px-4 py-1.5 text-[13px] border-purple-600 bg-purple-600 text-white rounded-md transition hover:border-gray-300 hover:bg-white hover:text-black">
            Create Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProject;
