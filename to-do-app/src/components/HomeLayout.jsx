import React from "react";

function HomeLayout() {
  return (
    <div className="flex flex-row ">
      <div className="w-2/3 bg-ash border-2 h-screen rounded-md ml-2 mt-2 mb-2">
        <h1 className="font-bold text-3xl p-4">Create Task...</h1>
      </div>
      <div className="w-1/3 bg-ash border-2 h-screen rounded-md m-2"></div>
    </div>
  );
}

export default HomeLayout;
