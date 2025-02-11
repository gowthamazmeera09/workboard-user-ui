import React from 'react';
import { FaBell, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Upperbar() {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg py-4">
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo/Title */}
        <h2 className="text-3xl font-extrabold tracking-wide text-white">WorkBoard</h2>
        
        {/* Icons */}
        <div className="flex items-center gap-8">
          <FaBell size={24} className="cursor-pointer hover:text-yellow-400 transition-all ease-in-out duration-300" />
          <Link to="Help">
            <FaHeadset size={24} className="cursor-pointer hover:text-yellow-400 transition-all ease-in-out duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Upperbar;
