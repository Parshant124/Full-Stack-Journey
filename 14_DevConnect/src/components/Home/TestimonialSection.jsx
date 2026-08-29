import React from "react";

function TestimonialSection() {
  return (
    <div className="flex w-full pt-8 justify-center">
      <div className="flex gap-4 w-120 shadow-md border border-black/20 rounded-lg p-5">
        <div className="bg-gray-400 w-1/5 h-fit rounded-full pt-0.5">
          <img
            src="https://cdn-icons-png.flaticon.com/128/265/265674.png"
            alt=""
            width="60px"
            className="object-cover overflow-hidden rounded-full"
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <img src=".\src\assets\5 stars.png" alt="" width="100px" />
          </div>
          <div className="text-gray-600 text-[14px]">
            "DevConnect has completely transformed the way I manage my projects.
            Highly recommended!"
          </div>
          <div className="text-gray-600 text-[12px]">
            - Alex Johnson, Full Stack Developer
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
