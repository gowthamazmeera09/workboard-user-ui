import React from 'react';
import { FaBell, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Upperbar() {
  return (
    <div className="bg-slate-100 text-black shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo/Title */}
        <h2 className="text-2xl font-bold">WorkBoard</h2>
        
        {/* Icons */}
        <div className="flex items-center gap-6">
          <FaBell size={24} className="cursor-pointer hover:text-blue-500 transition" />
          <Link to="Help"><FaHeadset size={24} className="cursor-pointer hover:text-blue-500 transition" /></Link>
        </div>
      </div>
    </div>
  );
}

export default Upperbar;
