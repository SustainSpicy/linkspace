import React from "react";

const Links = () => {
  return (
    <div className="w-full">
      <div className="relative grid grid-cols-1 sm:gap- sm:grid-cols-3">
        <div className=" col-span-2 bg-gray-400 min-w-0 min-h-screen p-2 flex items-start justify-end">
          <div className="max-w-[800px] lg:max-w-[828px] w-full  mt-[80px] sm:px-6">
            <div className="flex justify-between mb-6  rounded-2xl bg-white shadow-2xl p-6">
              <p>Hello world</p>
              <button>here</button>
            </div>
            <div className="flex justify-center mb-6 rounded-3xl bg-white shadow-2xl p-6">
              <p>Hello world</p>
            </div>
            <div className="flex justify-between mb-6  rounded-2xl bg-white shadow-2xl p-6">
              <p>Hello world</p>
              <button>here</button>
            </div>
            <div className="flex justify-between mb-6  rounded-2xl bg-white shadow-2xl p-6">
              <p>Hello world</p>
              <button>here</button>
            </div>
            <div className="flex justify-between mb-6  rounded-2xl bg-white shadow-2xl p-6">
              <p>Hello world</p>
              <button>here</button>
            </div>
          </div>
        </div>
        <div className=" bg-gray-300 min-w-0 min-h-screen flex justify-start">
          <div className="max-w-[400px] w-[20rem]  mt-[80px] sm:px-6">
            <div className=" mb-6 min-h-[80%]  rounded-2xl bg-white shadow-2xl p-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Links;
