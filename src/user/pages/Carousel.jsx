import React, { useState, useEffect } from "react";
import mason from '../images/uimason.jpg';
import painter from '../images/uipainter.jpg';
import plumber from  '../images/uiplumber.jpg';
import carpenter from '../images/uicarpenter.jpg';
import marbul from '../images/marbulmason.jpeg';
import electrician from '../images/uielectrician.jpg';
import teacher from '../images/uiteacher.jpg';
import ac from '../images/uiAcTech.jpg';
import lift from '../images/uiliftTech.jpg';
import driver from '../images/uidriver.jpg';
import welder from '../images/uiwelder.jpg';
import watchman from '../images/uiwatchman.jpg';


function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        mason,painter,plumber,carpenter,marbul,electrician,teacher,ac,lift,driver,welder,watchman
    ];

    // Automatically switch to the next slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className="relative w-full">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <img
                            src={image}
                            alt={`Slide ${index + 1}`}
                            className="block w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
            {/* Slider indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
                {images.map((_, index) => (
                    <button
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                            index === currentIndex ? "bg-white" : "bg-gray-400"
                        }`}
                        aria-label={`Slide ${index + 1}`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
            {/* Slider controls */}
            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
                onClick={() =>
                    setCurrentIndex((prevIndex) =>
                        prevIndex === 0 ? images.length - 1 : prevIndex - 1
                    )
                }
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                </span>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 group focus:outline-none"
                onClick={() =>
                    setCurrentIndex((prevIndex) =>
                        (prevIndex + 1) % images.length
                    )
                }
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                </span>
            </button>
        </div>
    );
}

export default Carousel;
