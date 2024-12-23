import React from 'react';
import mason from '../images/mason.jpeg';
import marbul from '../images/marbul mason.jpeg';
import painter from '../images/painter.jpeg';
import plumber from '../images/plumber.jpeg';
import electrician from '../images/electrician.jpeg';
import carpenter from '../images/carpenter.jpeg';
import welder from '../images/welder.jpeg';
import Carousel from './Carousel';

function Home() {
  return (
    <div>
      {/* carousel */}
      <div>
        <Carousel />
      </div>
      {/* home page upper images */}
      <div className='grid grid-cols-4 gap-10 m-5'>
        <div className='image-card'>
          <img src={mason} alt="Mason" width="40px" className="rounded-full" />
          <p className='text-xs'>mason</p>
        </div>
        <div className='image-card'>
          <img src={marbul} alt="Marbul Mason" width="40px" className="rounded-full" />
          <p className='text-xs'>marbul mason</p>
        </div>
        <div className='image-card'>
          <img src={painter} alt="Painter" width="40px" className="rounded-full" />
          <p className='text-xs'>painter</p>
        </div>
        <div className='image-card'>
          <img src={plumber} alt="Plumber" width="40px" className="rounded-full" />
          <p className='text-xs'>plumber</p>
        </div>
        <div className='image-card'>
          <img src={electrician} alt="Electrician" width="40px" className="rounded-full" />
          <p className='text-xs'>electrician</p>
        </div>
        <div className='image-card'>
          <img src={carpenter} alt="Carpenter" width="40px" className="rounded-full" />
          <p className='text-xs'>carpenter</p>
        </div>
        <div className='image-card'>
          <img src={welder} alt="Welder" width="40px" className="rounded-full" />
          <p className='text-xs'>welder</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
