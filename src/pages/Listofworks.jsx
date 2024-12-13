import React, { useState } from 'react';
import Ac from '../images/Ac technition.jpeg';
import carpenter from '../images/carpenter.jpeg';
import electrician from '../images/electrician.jpeg';
import lifttechnician from '../images/lift technition.jpeg';
import mason from '../images/mason.jpeg';
import marbul from '../images/marbul mason.jpeg';
import painter from '../images/painter.jpeg';
import plumber from '../images/plumber.jpeg';
import welder from '../images/welder.jpeg';

function Listofworks() {
    const [showAll, setShowAll] = useState(false);

    const workers = [
        { img: mason, title: "Mason" },
        { img: marbul, title: "Marble Mason" },
        { img: carpenter, title: "Carpenter" },
        { img: electrician, title: "Electrician" },
        { img: lifttechnician, title: "Lift Technician" },
        { img: Ac, title: "AC Technician" },
        { img: painter, title: "Painter" },
        { img: plumber, title: "Plumber" },
        { img: welder, title: "Welder" },
    ];

    // Determine how many items to show
    const itemsToShow = showAll ? workers.length : 6; // Show only two rows (6 items) initially

    return (
        <div className='bg-white  rounded-lg p-3 items-center shadow-md'>
            <header className='flex items-center justify-left mb-3'>
                <h2 className='text-lg font-bold'>Explore workers here</h2>
            </header>
            <div>
                <div className='grid grid-cols-3 gap-4 lg:grid-cols-9'>
                    {workers.slice(0, itemsToShow).map((worker, index) => (
                        <div key={index} className="flex flex-col items-center">
                        <img src={worker.img} width="80px" alt={worker.title} className="rounded-full shadow-md" />
                        <h3 className="mt-2 text-lg font-semibold text-gray-700 hover:text-blue-500 transition duration-300">
                            {worker.title}
                        </h3>
                    </div>
                    
                    ))}
                </div>
                <div className='mt-4 text-center'>
                    <button
                        className='px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600'
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Listofworks;
