import React from 'react'
import {Link} from 'react-router-dom'

function FeatureJoin() {
  return (
    <div className="p-4">
      <div className="w-full bg-purple-100 border border-blue-400/30 items-center flex justify-between p-4 rounded-lg shadow-lg gap-8">
        <div className="flex items-center gap-4 w-1/3">
          <div className="p-2 bg-blue-300 rounded-full w-fit h-fit">
            <img
              src="https://cdn-icons-png.flaticon.com/128/10584/10584843.png"
              alt=""
              width="70px"
              className="bg-purple-500 p-1 rounded-full"
            />
          </div>
          <div>
            <h2 className="font-bold text-lg">
              Built for developers, by developers
            </h2>
            <h4 className="text-[14px]">
              DevConnect is continuously improved with feedback from our amazing
              community of developers.
            </h4>
          </div>
        </div>
        <Link
          to="/signup"
          className="flex items-center h-fit gap-4 bg-purple-700 rounded px-4 py-2"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/10971/10971953.png"
            alt=""
            width="28px"
          />
          <h4 className="font-bold text-[14px] text-white">
            Join Our Community
          </h4>
        </Link>
      </div>
    </div>
  );
}

export default FeatureJoin