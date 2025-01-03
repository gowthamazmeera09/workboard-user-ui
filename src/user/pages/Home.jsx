import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mason from '../images/mason.jpeg';
import marbul from '../images/marbul mason.jpeg';
import painter from '../images/painter.jpeg';
import plumber from '../images/plumber.jpeg';
import electrician from '../images/electrician.jpeg';
import carpenter from '../images/carpenter.jpeg';
import welder from '../images/welder.jpeg';
import Carousel from './Carousel';
import MonthlyWorkers from './MonthlyWorkers';

function Home() {
  const roles = [
    { name: 'mason', image: mason },
    { name: 'marbul mason', image: marbul },
    { name: 'painter', image: painter },
    { name: 'plumber', image: plumber },
    { name: 'electrician', image: electrician },
    { name: 'carpenter', image: carpenter },
    { name: 'welder', image: welder },
    { name: 'mason', image: mason },
    { name: 'marbul mason', image: marbul },
    { name: 'painter', image: painter },
    { name: 'plumber', image: plumber },
    { name: 'electrician', image: electrician },
    { name: 'carpenter', image: carpenter },
    { name: 'welder', image: welder },
  ];

  const [visibleRoles, setVisibleRoles] = useState(8);

  const showMore = () => {
    setVisibleRoles((prev) => prev + 8);
  };

  return (
    <div>
      {/* Carousel */}
      <div>
        <Carousel />
      </div>
      {/* Home page upper images */}
      <div>
        <div className="ml-3 mt-5">
          <h1 className="text-md font-serif font-bold">Explore Workers</h1>
        </div>
        <div className="grid grid-cols-4 gap-10 m-5">
          {roles.slice(0, visibleRoles).map((role, index) => (
            <Link key={index} to={`/users/${role.name}`}>
              <div className="image-card">
                <img
                  src={role.image}
                  alt={role.name}
                  width="40px"
                  className="rounded-full"
                />
                <p className="text-xs">{role.name}</p>
              </div>
            </Link>
          ))}
        </div>
        {visibleRoles < roles.length && (
          <div className="text-center mt-4">
            <button
              onClick={showMore}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Show More
            </button>
          </div>
        )}
      </div>
      <div>
        <MonthlyWorkers />
      </div>
    </div>
  );
}

export default Home;
