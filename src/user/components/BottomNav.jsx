import React from 'react';
import { Link } from 'react-router-dom';

function BottomNav() {
    return (
        <div>
            <div className="fixed z-50 w-auto h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex justify-between h-full max-w-60 mx-auto px-4">
                    <button 
                        type="button" 
                        className="inline-flex flex-col items-center justify-center px-5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <Link to="/">
                            <svg 
                                className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" 
                                aria-hidden="true" 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                            >
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            <span className="sr-only">Home</span>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BottomNav;
