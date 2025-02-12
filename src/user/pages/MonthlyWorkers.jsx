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
    <div className="bg-gray-50 py-10">
      <div className="text-center py-6">
        <h1 className="text-3xl font-serif font-extrabold text-gray-800 mb-2">Monthly Workers</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-lg mx-auto">Find reliable monthly workers for various roles that best suit your needs.</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6 lg:px-16">
        {roles.slice(0, visibleRoles).map((role, index) => (
          <Link key={index} to={`/users/${role.name}`} className="transform hover:scale-105 transition-all duration-300">
            <div className="bg-white shadow-xl rounded-xl overflow-hidden transition-transform transform hover:scale-105">
              <img src={role.image} alt={role.name} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-4">
                <p className="text-center text-gray-800 font-semibold capitalize text-lg">{role.name.replace(/([A-Z])/g, ' $1').toLowerCase()}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleRoles < roles.length && (
        <div className="text-center my-6">
          <button
              onClick={showMore}
              className="px-8 py-3 bg-gradient-to-r from-gray-950 to-indigo-600 text-white rounded-full shadow-md hover:bg-gradient-to-r hover:from-gray-950 hover:to-indigo-700 transition-all"
            >
              Show More
            </button>
        </div>
      )}
    </div>
  );
}

export default MonthlyWorkers;
