import React, { useEffect, useState } from "react";
import ShowMyConnections from "./components/ShowMyConnections";
import SearchMyConnections from "./components/SearchMyConnections";

function Connections() {
  const [searchValue, setSearchValue] = useState("");
  const [showType, setShowType] = useState("all");

  return (
    <div className="p-6 flex flex-col gap-4 bg-gray-100 h-full">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Connections</h2>
          <h4 className="text-[14px] text-gray-600">
            Grow your network and connect with developers.
          </h4>
        </div>
      </div>
      <div className="flex justify-between">
        <input
          type="text"
          className="border-2 px-2 py-1 text-[14px] rounded-md bg-white border-gray-300 w-1/2"
          placeholder="Search connections..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          name=""
          id=""
          value={showType}
          onChange={(e) => setShowType(e.target.value)}
          className="bg-white px-2 text-[14px] rounded-md border-2 border-gray-300 focus:border-purple-600 outline-none"
        >
          <option value="all">All</option>
          <option value="connected">Connected</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div>
        {!searchValue && <ShowMyConnections showType={showType} />}

        {searchValue && (
          <SearchMyConnections value={searchValue} showType={showType} />
        )}
      </div>
    </div>
  );
}

export default Connections;
