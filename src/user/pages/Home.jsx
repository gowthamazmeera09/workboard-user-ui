import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mason from '../images/uimason.jpg';
import painter from '../images/uipainter.jpg';
import plumber from '../images/uiplumber.jpg';
import electrician from '../images/uielectrician.jpg';
import carpenter from '../images/uicarpenter.jpg';
import welder from '../images/uiwelder.jpg';
import Carousel from './Carousel';
import MonthlyWorkers from './MonthlyWorkers';
import automechanic from '../images/automechanic.jpg';
import bikemechanic from '../images/bikemechanic.jpg';
import Carmechanic from '../images/carmechanic.jpg';
import carwash from '../images/carwasher.jpeg';
import chef from '../images/chief.jpg';
import cloths from '../images/clothswasher.jpg';
import garden from '../images/gardencleaner.jpg';
import glass from '../images/glasscleaner.jpg';
import kids from '../images/kidscaretaker.jpg';
import old from '../images/oldpeoplecaretaker.jpg';
import makeup from '../images/makeupartest 2.jpg';
import photographer from '../images/photographer.jpg';
import cattering from '../images/waiter.jpg';
import dishes from '../images/washingdishes.jpg';
import WPpage from './WPpage';

function Home() {
  const roles = [
    { name: 'mason', image: mason },
    { name: 'painter', image: painter },
    { name: 'plumber', image: plumber },
    { name: 'electrician', image: electrician },
    { name: 'carpenter', image: carpenter },
    { name: 'welder', image: welder },
    { name: 'automechanic', image: automechanic },
    { name: 'bikemechanic', image: bikemechanic },
    { name: 'carmechanic', image: Carmechanic },
    { name: 'carwash', image: carwash },
    { name: 'chef', image: chef },
    { name: 'Dhobi', image: cloths },
    { name: 'gardener', image: garden },
    { name: 'glasscleaner', image: glass },
    { name: 'kidscaretaker', image: kids },
    { name: 'oldpeoplecaretaker', image: old },
    { name: 'photographer', image: photographer },
    { name: 'makeupartest', image: makeup },
    { name: 'cattering', image: cattering },
    { name: 'dishwasher', image: dishes },
  ];

  const [visibleRoles, setVisibleRoles] = useState(8);

  const showMore = () => {
    setVisibleRoles((prev) => prev + 8);
  };

  return (
    <div className="mb-32">
      {/* Carousel */}
      <div className="mb-12">
        <Carousel />
      </div>

      {/* Home page upper images */}
      <div className="lg:ml-24">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Reliable Work Opportunities</h1>
          <p className="text-md text-gray-500">Browse through various roles and hire trusted monthly workers for your needs</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-8 px-4 py-8">
          {roles.slice(0, visibleRoles).map((role, index) => (
            <Link key={index} to={`/users/${role.name}`} className="group">
              <div className="relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all transform group-hover:scale-105">
                <img
                  src={role.image}
                  alt={role.name}
                  className="w-full h-40 object-cover group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 group-hover:opacity-70"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white text-lg font-semibold group-hover:text-yellow-300">
                  {role.name}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {visibleRoles < roles.length && (
          <div className="text-center mt-8">
            <button
              onClick={showMore}
              className="px-8 py-3 bg-gradient-to-r from-gray-950 to-indigo-600 text-white rounded-full shadow-md hover:bg-gradient-to-r hover:from-gray-950 hover:to-indigo-700 transition-all"
            >
              Show More
            </button>
          </div>
        )}
      </div>

      {/* Monthly Workers */}
      <div className="mt-16">
        <MonthlyWorkers />
      </div>

      {/* WP Page */}
      <div className="mt-16">
        <WPpage />
      </div>
    </div>
  );
}

export default Home;
