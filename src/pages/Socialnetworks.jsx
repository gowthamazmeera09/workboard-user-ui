import React from 'react'
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';


function Socialnetworks() {
  return (
    <div className='flex gap-2 ml-6 pb-28 mt-5'>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FaInstagram size={30} style={{ marginRight: '10px' }} />
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FaFacebook size={30} style={{ marginRight: '10px' }} />
      </a>
      <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
        <FaWhatsapp size={30} style={{ marginRight: '10px' }} />
      </a>
    </div>
  )
}

export default Socialnetworks;