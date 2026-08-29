import { useState } from "react";
import SeachProject from "./components/SeachProject";
import ShowProject from "./components/ShowProject";
import { NavLink } from "react-router-dom";

function Projects() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-100 h-fit min-h-full">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-2xl">Projects</h2>
          <h4 className="text-[14px] text-gray-600">
            Discover amazing projects from the community.
          </h4>
        </div>
        <div>
          <NavLink
            to="/bookmarks"
            className="text-purple-600 text-[14px] hover:underline underline-offset-2"
          >
            all BookMarks
          </NavLink>
        </div>
      </div>
      <div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search projects..."
          className=" text-[14px] border-2 border-gray-300 px-2 py-1 rounded-lg w-100 bg-white"
        />
      </div>
      <div>
        {searchValue && <SeachProject value={searchValue} />}
        {!searchValue && <ShowProject />}
      </div>
    </div>
  );
}

export default Projects;
