import React from 'react'
import { AboutDetails, AboutOurMission, AboutFeatures, AboutGithub, AboutStats } from '../components/About'
import Extra from '../components/Extra'

function About() {
  return (
    <div>
      <AboutDetails />
      <AboutOurMission />
      <AboutFeatures />
      <AboutStats />
      <AboutGithub />
    </div>
  )
}

export default About