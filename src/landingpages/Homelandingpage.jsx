import React from 'react'
import Bottomnavigation from '../components/Bottomnavigation';
import Navbar from '../components/Navbar';
import SearchBox from '../components/Searchbox';
import Carousel from '../pages/Carousel';
import Taxibutton from '../pages/Taxibutton';
import Listofworks from '../pages/Listofworks';
import Monthlyworkers from '../pages/Monthlyworkers';

function Homelandingpage() {
  return (
    <div className='mb-20'>
      <Navbar />
      <SearchBox />
      <Carousel />
      <Taxibutton />
      <Listofworks />
      <Monthlyworkers />
      <Bottomnavigation />
    </div>
  )
}

export default Homelandingpage;