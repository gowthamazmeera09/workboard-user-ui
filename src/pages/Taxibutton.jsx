import React from 'react';
import bike from '../images/taxibike.jpeg';
import car from '../images/taxicar.jpeg';

function Taxibutton() {
    return (
        <div className='bg-white m-4 rounded-lg p-3 items-center shadow-md'>
            <header className='flex items-center justify-left mb-3'>
                <h2 className='text-lg font-bold'>Book a taxi here</h2>
            </header>
            <div className='flex flex-wrap gap-5 justify-start'>
                <button className='h-20 w-20 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 hover:shadow-lg transition-shadow duration-200'>
                    <img src={bike} alt="Taxi bike" className='h-full w-full object-cover' />
                </button>
                <button className='h-20 w-20 rounded-full flex items-center justify-center overflow-hidden border border-gray-300 hover:shadow-lg transition-shadow duration-200'>
                    <img src={car} alt="Taxi car" className='h-full w-full object-cover' />
                </button>
            </div>
        </div>
    );
}

export default Taxibutton;
