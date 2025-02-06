import React, { useState } from "react";
import { Link } from "react-router-dom";
import watchman from "../images/watchmen.jpeg";
import driver from "../images/driver.jpeg";
import teacher from "../images/teacher.jpeg";
import kids from '../images/kidscaretaker.jpg';
import old from '../images/oldpeoplecaretaker.jpg';

function MonthlyWorkers() {
  const roles = [
    { name: "watchman", image: watchman },
    { name: "driver", image: driver },
    { name: "teacher", image: teacher },
    { name: 'kidscaretaker', image: kids },
    { name: 'oldpeoplecaretaker', image: old },
  ];

  const [visibleRoles, setVisibleRoles] = useState(4);

  const showMore = () => {
    setVisibleRoles((prev) => prev + 4);
  };

  return (
    <div className="bg-gray-50">
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
                <p className="text-center text-gray-700 font-medium capitalize">{role.name}</p>
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
