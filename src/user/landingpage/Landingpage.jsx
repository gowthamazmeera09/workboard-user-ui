import React from 'react'
// import BottomNav from '../components/BottomNav';
import { Outlet } from 'react-router-dom';
import Upperbar from '../components/Upperbar';

function Landingpage() {
  return (
    <div>
      <Upperbar />
      {/* <BottomNav /> */}
      <Outlet />
    </div>
  )
}

export default Landingpage;