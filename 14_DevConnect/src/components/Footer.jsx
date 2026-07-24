import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="bg-gray-800 text-white pt-4 absolute w-full bottom-0">
      <div className="flex px-10 justify-between gap-10">
        <div className="w-1/4 flex flex-col gap-4">
          <img src=".\src\assets\DevConnect.png" alt="" width="200px" />
          <h4 className="text-[14px]">
            The all in one platform for developers to build, collaborate and
            grow
          </h4>
          <div className="flex gap-2">
            <a href="https://github.com/Parshant124" target="_blank">
              <img
                src="https://www.svgrepo.com/show/361182/github-inverted.svg"
                alt=""
                width="30px"
                className="bg-gray-400 rounded-full p-1"
              />
            </a>
            <a href="https://x.com/parshant7v" target="_blank">
              <img
                src="https://www.svgrepo.com/show/521900/twitter.svg"
                alt=""
                width="30px"
                className="bg-gray-400 rounded-full p-1"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/parshant-311594324/"
              target="_blank"
            >
              <img
                src="https://www.svgrepo.com/show/370259/linkedin.svg"
                alt=""
                className="bg-gray-400 w-7.5 rounded-full p-1 object-fit-cover"
              />
            </a>
          </div>
        </div>
        <div className="w-1/4 flex flex-col gap-1">
          <h2 className="font-semibold">Company</h2>
          <Link to="">
            <h4 className="text-[14px]">Home</h4>
          </Link>
          <Link to="features">
            <h4 className="text-[14px]">Features</h4>
          </Link>
          <Link to="about">
            <h4 className="text-[14px]">About</h4>
          </Link>
        </div>
        <div className="w-1/4 flex flex-col gap-1">
          <h2 className="font-semibold">Resources</h2>
          <Link to="comingsoon">
            <h4 className="text-[14px]">Blog</h4>
          </Link>
          <Link to="comingsoon">
            <h4 className="text-[14px]">Docs</h4>
          </Link>
          <Link to="comingsoon">
            <h4 className="text-[14px]">Help Center</h4>
          </Link>
        </div>
        <div className="w-1/4 flex flex-col gap-1">
          <h2 className="font-semibold">Legal</h2>
          <Link to="comingsoon">
            <h4 className="text-[14px]">Privacy Policy</h4>
          </Link>
          <Link to="comingsoon">
            <h4 className="text-[14px]">Terms of Service</h4>
          </Link>
          <Link to="comingsoon">
            <h4 className="text-[14px]">Cookie Policy</h4>
          </Link>
        </div>
      </div>
      <div className="w-full flex justify-center text-[14px] py-4">
        <h4>&copy; 2026 DevConnect. All rights reserved</h4>
      </div>
    </div>
  );
}

export default Footer;
