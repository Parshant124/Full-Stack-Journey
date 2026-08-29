import React from "react";
import FeaturesCard from "./FeaturesCard";

function AboutFeatures() {
  return (
    <div className="flex gap-4 w-full justify-around py-8 px-4 flex-wrap">
      <div className="w-60">
        <FeaturesCard
          iconbg="blue-200"
          icon="https://cdn-icons-png.flaticon.com/128/7829/7829198.png"
          title="Connect"
          desc="Build meaningfull connections with developers worldwide."
        />
      </div>
      <div className="w-60">
        <FeaturesCard
          iconbg="green-200"
          icon="https://cdn-icons-png.flaticon.com/128/3573/3573187.png"
          title="Collaborate"
          desc="Work together on innovative projects and solve problems."
        />
      </div>
      <div className="w-60">
        <FeaturesCard
          iconbg="purple-200"
          icon="https://cdn-icons-png.flaticon.com/128/18058/18058194.png"
          title="Learn"
          desc="Share knowledge and learn from the community."
        />
      </div>
      <div className="w-60">
        <FeaturesCard
          iconbg="orange-200"
          icon="https://cdn-icons-png.flaticon.com/128/2285/2285559.png"
          title="Grow"
          desc="Advance your skills and accelerate your career."
        />
      </div>
    </div>
  );
}

export default AboutFeatures;
