import React from "react";
import { Link } from "react-router-dom";

function AuthRightBottom({ msg }) {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h4 className="text-[14px] text-gray-600">or continue with</h4>
      <div className="flex flex-col gap-2 w-full items-center">
        <Link
          to="\comingsoon"
          className="flex items-center gap-4 border-2 border-gray-300 rounded-md py-2 px-8 w-full justify-center"
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/270/270798.png"
              alt=""
              width="20px"
            />
          </div>
          <h4 className="text-[14px] ">{msg} with GitHub</h4>
        </Link>
        <Link
          to="comingsoon"
          className="flex items-center gap-4 border-2 border-gray-300 rounded-md py-2 px-8 w-full justify-center"
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
              alt=""
              width="20px"
            />
          </div>
          <h4 className="text-[14px] ">{msg} with Google</h4>
        </Link>
        <Link
          to="comingsoon"
          className="flex items-center gap-4 border-2 border-gray-300 rounded-md py-2 px-8 w-full justify-center"
        >
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/145/145807.png"
              alt=""
              width="20px"
            />
          </div>
          <h4 className="text-[14px] ">{msg} with LinkdIn</h4>
        </Link>
      </div>
    </div>
  );
}

export default AuthRightBottom;
