import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import watchman from '../images/watchmen.jpeg';
import driver from '../images/driver.jpeg';
import teacher from '../images/teacher.jpeg';

function MonthlyWorkers() {
  const roles = [
    { name: 'Watchman', image: watchman },
    { name: 'Driver', image: driver },
    { name: 'Teacher', image: teacher },
    { name: 'Security', image: watchman },
    { name: 'Chauffeur', image: driver },
    { name: 'Educator', image: teacher },
    { name: 'Guard', image: watchman },
    { name: 'Driver Pro', image: driver },
  ];

  const [visibleRoles, setVisibleRoles] = useState(6);

  const showMore = () => {
    setVisibleRoles((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="text-center py-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">Monthly Workers</h1>
        <p className="text-sm text-gray-600 mt-1">Find reliable monthly workers for various roles</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-5">
        {roles.slice(0, visibleRoles).map((role, index) => (
          <Link key={index} to={`/users/${role.name}`} className="hover:scale-105 transform transition-all duration-300">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={role.image} alt={role.name} className="w-full h-40 object-cover" />
              <div className="p-3">
                <p className="text-center text-gray-700 font-medium">{role.name}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleRoles < roles.length && (
        <div className="text-center my-6">
          <button
            onClick={showMore}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}

export default MonthlyWorkers;
