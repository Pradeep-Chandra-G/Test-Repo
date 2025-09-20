// Navbar.jsx
import React from "react";
import Search from "./Search";

function Navbar() {
  return (
    <div>
      <div className="sm:text-sm w-full bg-black flex items-center justify-between px-4 h-20">
        <h1 className="text-white font-bold text-2xl md:text-5xl">To Do App!</h1>
        <Search />
      </div>
      <div className="h-full w-full p-1 bg-tufts-blue"></div>
    </div>
  );
}

export default Navbar;
