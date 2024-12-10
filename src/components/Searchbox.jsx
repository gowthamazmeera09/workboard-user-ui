import React from 'react';

const SearchBox = ({ placeholder, onSearch }) => {
  return (
    <div className="flex items-center w-full max-w-md mx-auto mt-3 bg-white border border-gray-300 rounded-full shadow-md">
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        className="w-full px-4 py-2 text-gray-700 bg-transparent rounded-l-full focus:outline-none"
        onChange={(e) => onSearch && onSearch(e.target.value)}
      />
      <button className="px-4 py-2 text-white bg-blue-500 rounded-r-full hover:bg-blue-600 focus:outline-none">
        🔍
      </button>
    </div>
  );
};

export default SearchBox;
