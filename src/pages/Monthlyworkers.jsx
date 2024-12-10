import React, { useState } from 'react';
import driver from '../images/driver.jpeg';
import teacher from '../images/teacher.jpeg';
import watchman from '../images/watchmen.jpeg';

function Monthlyworkers() {
    const [showAll, setShowAll] = useState(false);

    const workers = [
        { img: driver, title: "Driver" },
        { img: teacher, title: "Teacher" },
        { img: teacher, title: "Teacher" },
        { img: watchman, title: "Watchman" }
    ];

    // Determine how many items to show
    const itemsToShow = showAll ? workers.length : 6; // Show only two rows (6 items) initially

    return (
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 m-4 rounded-lg p-6 shadow-lg">
            <header className="flex items-center justify-left mb-5">
                <h2 className="text-2xl font-bold text-gray-800">Monthly Salary Workers</h2>
            </header>
            <div>
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
                    {workers.slice(0, itemsToShow).map((worker, index) => (
                        <div key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                            <img 
                                src={worker.img} 
                                width="150px" 
                                alt={worker.title} 
                                className="rounded-md shadow-sm"
                            />
                            <h3 className="mt-3 text-lg font-semibold text-gray-700 hover:text-blue-600 transition duration-300">
                                {worker.title}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <button
                        className="px-5 py-3 bg-blue-500 text-white text-sm rounded-lg shadow-md hover:bg-blue-600 transition"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? "Show Less" : "Show More"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Monthlyworkers;
