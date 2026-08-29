import React from "react";
import StatsCard from "./StatsCard";

function AboutStats() {
  return (
    <div className="px-12">
      <div className="w-full border border-black/20 flex justify-around rounded-lg shadow-lg">
        <div className="border-[0_2px_0_0] border-black/10 my-6 flex justify-center w-1/4">
          <StatsCard title="10K+" titleColor="blue" desc="Developers" />
        </div>
        <div className="border-[0_2px_0_0] border-black/10 my-6 flex justify-center w-1/4">
          <StatsCard title="5K+" titleColor="green" desc="Projects" />
        </div>
        <div className="border-[0_2px_0_0] border-black/10 my-6 flex justify-center w-1/4">
          <StatsCard title="15K+" titleColor="purple" desc="Connections" />
        </div>
        <div className="my-6 flex justify-center w-1/4">
          <StatsCard title="2K+" titleColor="orange" desc="Articles" />
        </div>
      </div>
    </div>
  );
}

export default AboutStats;
