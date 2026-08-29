import React from "react";

function FeatureTitle() {
  return (
    <div className="pt-12 flex flex-col gap-4 w-full items-center">
      <div className="am:w-1/3 flex flex-col gap-4 w-1/2">
        <h4 className="text-center text-[14px] font-semibold text-purple-800">
          FEATURES
        </h4>
        <h2 className="text-center font-bold text-3xl">
          Everything you need to build, collaborate and grow
        </h2>
        <h4 className="text-center text-gray-600">
          Powerful features designed to help developers work better together and
          achieve more.
        </h4>
      </div>
    </div>
  );
}

export default FeatureTitle;
