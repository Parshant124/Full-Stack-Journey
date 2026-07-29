import React from "react";

function FeatureSection() {
  return (
    <div className="flex items-center flex-col gap-4 w-full pt-4 border-[1px_0px_0px_0px] border-black/20 bg-white">
      <h2 className="font-bold text-xl">Why DevConnect?</h2>
      <div className="flex w-full justify-around">
        <div className="w-1/4 border border-black/20 rounded-lg shadow-md flex flex-col items-center px-14 py-6">
          <div className="bg-purple-300 rounded-full p-3">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3767/3767084.png"
              alt=""
              width="35px"
            />
          </div>
          <h2 className="font-medium">Project Management</h2>
          <h4 className="text-[14px] text-gray-600 text-center">
            Track all your development work in one organized place.
          </h4>
        </div>
        <div className="w-1/4 border border-black/20 rounded-lg shadow-md flex flex-col items-center px-14 py-6">
          <div className="bg-purple-300 rounded-full p-3">
            <img
              src="https://cdn-icons-png.flaticon.com/128/8215/8215621.png"
              alt=""
              width="35px"
            />
          </div>
          <h2 className="font-medium">Team Collaboration</h2>
          <h4 className="text-[14px] text-gray-600 text-center">
            Work seamlessly with your team in real-life.
          </h4>
        </div>
        <div className="w-1/4 border border-black/20 rounded-lg shadow-md flex flex-col items-center px-14 py-6">
          <div className="bg-purple-300 rounded-full p-3">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3573/3573187.png"
              alt=""
              width="35px"
            />
          </div>
          <h2 className="font-medium">Developer Profile</h2>
          <h4 className="text-[14px] text-gray-600 text-center">
            Showcase your work and grow your developer brand.
          </h4>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;
