import React from 'react'
import Bottomnavigation from '../components/Bottomnavigation';
import Navbar from '../components/Navbar';
import SearchBox from '../components/Searchbox';
import Carousel from '../pages/Carousel';
import Taxibutton from '../pages/Taxibutton';
import Listofworks from '../pages/Listofworks';
import Monthlyworkers from '../pages/Monthlyworkers';
import Join from '../pages/Join';
import Bottombanner from '../pages/Bottombanner';
import Aboutapp from '../pages/Aboutapp';
import Socialnetworks from '../pages/Socialnetworks';

function Homelandingpage() {
  return (
    <div className='mb-56'>
      <Navbar />
      <SearchBox />
      <Carousel />
      <Taxibutton />
      <Listofworks />
      <Monthlyworkers />
      <Bottombanner />
      <Join />
      <Aboutapp />
      <Socialnetworks />
      <Bottomnavigation />
    </div>
  )
}

export default Homelandingpage;