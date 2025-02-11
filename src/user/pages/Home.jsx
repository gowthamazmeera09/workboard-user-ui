import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mason from '../images/uimason.jpg';
// import marbul from '../images/marbulmason.jpeg';
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
    // { name: 'marbulmason', image: marbul },
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
    <div className='mb-32'>
      {/* Carousel */}
      <div>
        <Carousel />
      </div>
      {/* Home page upper images */}
      <div className='lg:ml-24'>
      <div className="text-center py-6">
        <h1 className="text-2xl font-serif font-bold text-gray-800">Explore Works</h1>
        <p className="text-sm text-gray-600 mt-1">Find reliable monthly workers for various roles</p>
      </div>
        <div className="grid grid-cols-4 gap-10 m-5">
          {roles.slice(0, visibleRoles).map((role, index) => (
            <Link key={index} to={`/users/${role.name}`}>
              <div className="image-card">
                <img
                  src={role.image}
                  alt={role.name}
                  width="130px"
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
      <div>
        <WPpage />
      </div>
    </div>
  );
}

export default Home;
