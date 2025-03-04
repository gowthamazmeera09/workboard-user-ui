import React from 'react'

function WPpage() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center  px-6">
            <div className="max-w-xl text-center bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                    <strong>Join And Earn Money Daily!</strong>
                </h1>
                <p className="text-gray-600 text-lg mb-6">
                    Are you looking for a part-time job with great opportunities? Become a part of our trusted network of workers in various fields  With flexible daily and monthly roles, you can connect with clients who need your expertise. Join us today and start earning by offering your skills in a reliable, professional environment.
                </p>
                <div className="flex justify-center">
                    <a 
                        href="https://www.workerboard.work/"
                        className="px-8 py-3 bg-gradient-to-r from-gray-950 to-indigo-600 text-white rounded-full shadow-md hover:bg-gradient-to-r hover:from-gray-950 hover:to-indigo-700 transition-all">
                        CLICK HERE
                    </a>
                </div>
            </div>
        </div>
    )
}

export default WPpage;
