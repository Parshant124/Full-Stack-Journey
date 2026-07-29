import React from 'react'
import Cards from './Cards'
import Extra from "../Extra.jsx";

function FeatureDisplay() {
  return (
    <div className="flex gap-10 justify-around flex-wrap px-18 py-8">
      <div>
        <Cards
          iconBg="blue-200"
          icon="https://cdn-icons-png.flaticon.com/128/12075/12075377.png"
          imgDisplay=".\src\components\Features\assets\Card1.png"
          title="Project Showcase"
          desc="Showcase your Projects to the world with beautiful portfolios and detailed documentation."
        />
      </div>
      <div>
        <Cards
          iconBg="purple-200"
          icon="https://cdn-icons-png.flaticon.com/128/8215/8215621.png"
          imgDisplay=".\src\components\Features\assets\Card2.png"
          title="Team Collaboration"
          desc="Collaborate with your team in real-time with discussion, tasks and project management tools."
        />
      </div>
      <div>
        <Cards
          iconBg="green-200"
          icon="https://cdn-icons-png.flaticon.com/128/171/171322.png"
          imgDisplay=".\src\components\Features\assets\Card3.png"
          title="Knowledge Sharing"
          desc="Share knowledge through articles, tutorials, and guides. Learn from the community."
        />
      </div>
      <div>
        <Cards
          iconBg="orange-200"
          icon="https://cdn-icons-png.flaticon.com/128/3094/3094956.png"
          imgDisplay=".\src\components\Features\assets\Card4.png"
          title="Real-time Updates"
          desc="Stay updated with real-time notifications on project activities, mentions and collaboraions."
        />
      </div>
      <div>
        <Cards
          iconBg="blue-200"
          icon="https://cdn-icons-png.flaticon.com/128/954/954591.png"
          imgDisplay=".\src\components\Features\assets\Card5.png"
          title="Discover Developers"
          desc="Find and connect with talented developers based on skills, interests, and experience."
        />
      </div>
      <div>
        <Cards
          iconBg="purple-200"
          icon="https://cdn-icons-png.flaticon.com/128/2592/2592317.png"
          imgDisplay=".\src\components\Features\assets\Card6.png"
          title="Secure & Private"
          desc="Your date and projects are protected with top-notchc security and privacy controls."
        />
      </div>
    </div>
  );
}

export default FeatureDisplay