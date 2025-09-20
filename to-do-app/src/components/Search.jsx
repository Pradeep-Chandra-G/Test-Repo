// Search.jsx
import React from "react";

function Search() {
  return (
    <div className="flex items-center">
      <label htmlFor="note-search" className="text-white font-bold text-lg mr-2">
        Search
      </label>
      <input
        id="note-search"
        type="text"
        placeholder="Type here..."
        className="p-1 rounded border border-gray-300 text-white"
      />
    </div>
  );
}

export default Search;
