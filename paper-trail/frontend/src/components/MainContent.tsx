import React, { useRef } from "react";
import SideBar from "./SideBar";
import CreateNote from "./CreateNote";
import AnimatedBar from "./AnimatedBar";

function MainContent() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col md:flex-row justify-between items-stretch md:pt-10 md:pl-15 md:pr-15">
      <div className="w-full sm:w-1/2 md:w-1/3 lg:max-w-sm flex flex-col p-6">
        <SideBar />
      </div>

      <div className="hidden md:block gap-2">
        <AnimatedBar orientation="vertical" />
      </div>

      <div className="w-full md:w-[50%] h-100 md:h-150">
        <CreateNote />
      </div>
    </div>
  );
}

export default MainContent;
