import React from 'react'

function WPpage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center  px-6">
            <div className="max-w-xl text-center bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    <strong>Join Our Community of Skilled Workers!</strong>
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                    Are you looking for a part-time job with great opportunities? Become a part of our trusted network of workers in various fields such as watchman, driver, teacher, caretaker, and more! With flexible monthly roles, you can connect with clients who need your expertise. Join us today and start earning by offering your skills in a reliable, professional environment.
                </p>
                <div className="flex justify-center">
                    <a 
                        href="https://workboard-frontend.vercel.app/"
                        className="inline-block px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 transform hover:scale-105">
                        CLICK HERE
                    </a>
                </div>
            </div>
        </div>
    )
}

export default WPpage;
