import React from "react";
import {
  AboutDetails,
  AboutOurMission,
  AboutFeatures,
  AboutGithub,
  AboutStats,
} from "../../components/About";

function About() {
  return (
    <div>
      <AboutDetails />
      <AboutOurMission />
      <AboutFeatures />
      <AboutStats />
      <AboutGithub />
    </div>
  );
}

export default About;
