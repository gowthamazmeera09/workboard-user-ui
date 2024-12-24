import React from 'react';
import { Link } from 'react-router-dom';
import mason from '../images/mason.jpeg';
import marbul from '../images/marbul mason.jpeg';
import painter from '../images/painter.jpeg';
import plumber from '../images/plumber.jpeg';
import electrician from '../images/electrician.jpeg';
import carpenter from '../images/carpenter.jpeg';
import welder from '../images/welder.jpeg';
import Carousel from './Carousel';

function Home() {
  const roles = [
    { name: 'mason', image: mason },
    { name: 'marbul mason', image: marbul },
    { name: 'painter', image: painter },
    { name: 'plumber', image: plumber },
    { name: 'electrician', image: electrician },
    { name: 'carpenter', image: carpenter },
    { name: 'welder', image: welder },
  ];

  return (
    <div>
      {/* Carousel */}
      <div>
        <Carousel />
      </div>
      {/* Home page upper images */}
      <div className='grid grid-cols-4 gap-10 m-5'>
        {roles.map((role) => (
          <Link key={role.name} to={`/users/${role.name}`}>
            <div className='image-card'>
              <img src={role.image} alt={role.name} width="40px" className="rounded-full" />
              <p className='text-xs'>{role.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
