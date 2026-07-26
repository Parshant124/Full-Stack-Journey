import React, { useState } from "react";
import AuthLeftSide from "./components/AuthLeftSide";
import AuthRightBottom from "./components/AuthRightBottom";
import { Link } from "react-router-dom";

function SignUp() {
  const [hidePassword, setHidePassword] = useState("password");
  const [hideConfirmPassword, setHideConfirmPassword] = useState("password");

  return (
    <div className="flex w-full min-h-screen h-fit">
      <div className="flex flex-col items-center w-1/2 gap-4 min-h-full bg-purple-200 border-r-2 border-gray-300 px-10 py-10">
        <AuthLeftSide
          title="Join DevConnect"
          titleDesc="Create your account and become a part of our developor coummunity."
          image=".\src\Pages\assets\Girl.png"
          infoCards={[
            {
              img: "https://cdn-icons-png.flaticon.com/128/978/978012.png",
              title: "Connect",
              desc: "Meet and collaborate with developers.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/13543/13543945.png",
              title: "Learn",
              desc: "Share knowledge and grow together.",
            },
            {
              img: "https://cdn-icons-png.flaticon.com/128/9930/9930221.png",
              title: "Build",
              desc: "Work on amazing projects together.",
            },
          ]}
        />
      </div>
      <div className="w-1/2 min-h-full flex flex-col px-10 py-10 gap-8">
        <div>
          <h1 className="font-bold text-3xl">Create Account</h1>
          <h3 className="text-[14px] text-gray-600">
            Let's get you started with DevConnect.
          </h3>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[14px] font-semibold">Full Name</h2>
          <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />
            </div>
            <input
              type="text"
              placeholder="Parshant"
              className="focus:outline-none text-[14px] w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[14px] font-semibold">Email Address</h2>
          <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />
            </div>
            <input
              type="email"
              placeholder="you@example.com"
              className="focus:outline-none text-[14px] w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[14px] font-semibold">Username</h2>
          <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />
            </div>
            <input
              type="text"
              placeholder="parshant"
              className="focus:outline-none text-[14px] w-full"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[14px] font-semibold">Password</h2>
          <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
            <div>
              <img
                src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                alt=""
                width="15px"
              />
            </div>
            <input
              type={hidePassword}
              placeholder="........"
              className="focus:outline-none text-[14px] w-6/7"
            />
            <button
              onClick={() =>
                setHidePassword((prev) =>
                  prev === "password" ? "text" : "password",
                )
              }
            >
              <img
                src={
                  hidePassword === "password"
                    ? "https://cdn-icons-png.flaticon.com/128/10898/10898993.png"
                    : "https://cdn-icons-png.flaticon.com/128/11502/11502607.png"
                }
                alt=""
                width="20px"
              />
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-[14px] font-semibold">Confirm Password</h2>
          <div>
            <div className="border-2 border-gray-300 rounded-md flex gap-4 items-center px-2 py-2">
              <div>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png"
                  alt=""
                  width="15px"
                />
              </div>
              <input
                type={hideConfirmPassword}
                placeholder="........"
                className="focus:outline-none text-[14px] w-6/7"
              />
              <button
                onClick={() =>
                  setHideConfirmPassword((prev) =>
                    prev === "password" ? "text" : "password",
                  )
                }
              >
                <img
                  src={
                    hideConfirmPassword === "password"
                      ? "https://cdn-icons-png.flaticon.com/128/10898/10898993.png"
                      : "https://cdn-icons-png.flaticon.com/128/11502/11502607.png"
                  }
                  alt=""
                  width="20px"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <input type="checkbox" name="" id="" />
          <label>
            I agree to the{" "}
            <Link to="#" className="text-purple-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-purple-600">
              Privacy Policy
            </Link>
          </label>
        </div>
        <div className="w-full">
          <button className="bg-purple-600 text-white text-[14px] py-2 w-full rounded hover:bg-purple-700">
            Create Account
          </button>
        </div>
        <div>
          <AuthRightBottom msg="Sign up" />
        </div>
        <div className="w-full">
          <h2 className="text-[14px] text-gray-600 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-700 font-semibold">
              {" "}
              Log In
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
