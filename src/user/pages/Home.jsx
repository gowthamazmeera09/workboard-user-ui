import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mason from '../images/mason.jpeg';
import marbul from '../images/marbulmason.jpeg';
import painter from '../images/painter.jpeg';
import plumber from '../images/plumber.jpeg';
import electrician from '../images/electrician.jpeg';
import carpenter from '../images/carpenter.jpeg';
import welder from '../images/welder.jpeg';
import Carousel from './Carousel';
import MonthlyWorkers from './MonthlyWorkers';
import aglabour from '../images/agriculturallabour.jpeg';
import automechanic from '../images/automechanic.jpg';
import bikemechanic from '../images/bikemechanic.jpg';
import Carmechanic from '../images/carmechanic.jpg';
import carwash from '../images/carwasher.jpeg';
import chief from '../images/chief.jpg';
import cloths from '../images/clothswasher.jpg';
import garden from '../images/gardencleaner.jpg';
import glass from '../images/glasscleaner.jpg';
import kids from '../images/kidscaretaker.jpg';
import old from '../images/oldpeoplecaretaker.jpg';
import makeup from '../images/makeupartest 2.jpg';
import photographer from '../images/photographer.jpg';
import cattering from '../images/waiter.jpg';
import dishes from '../images/washingdishes.jpg';

function Home() {
  const roles = [
    { name: 'mason', image: mason },
    { name: 'marbulmason', image: marbul },
    { name: 'painter', image: painter },
    { name: 'plumber', image: plumber },
    { name: 'electrician', image: electrician },
    { name: 'carpenter', image: carpenter },
    { name: 'welder', image: welder },
    { name: 'agriculturallabour', image: aglabour },
    { name: 'automechanic', image: automechanic },
    { name: 'bikemechanic', image: bikemechanic },
    { name: 'carmechanic', image: Carmechanic },
    { name: 'carwash', image: carwash },
    { name: 'chief', image: chief },
    { name: 'washingcloths', image: cloths },
    { name: 'gardencleaner', image: garden },
    { name: 'glasscleaner', image: glass },
    { name: 'kidscaretaker', image: kids },
    { name: 'oldpeoplecaretaker', image: old },
    { name: 'photographer', image: photographer },
    { name: 'makeupartest', image: makeup },
    { name: 'cattering', image: cattering  },
    { name: 'dishwasher', image: dishes },
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
