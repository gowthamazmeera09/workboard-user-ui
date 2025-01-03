import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { haversineDistance } from './Utils'; // Import your haversine function
import { FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa'; // Import icons

const API_URL = "https://workboard-backend.onrender.com/user/all-users";

const UsersList = () => {
  const { role } = useParams(); // Extract the role from URL
  const [users, setUsers] = useState([]); // State to store fetched users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users state
  const [userLocation, setUserLocation] = useState(null); // User's dynamic location
  const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image
  const [error, setError] = useState(null); // Location error state
  const radius = 15; // Radius in km

  useEffect(() => {
    // Fetch user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([longitude, latitude]);
      },
      (err) => {
        setError("Unable to fetch your location. Please enable location services.");
      }
    );
  }, []);

  useEffect(() => {
    // Fetch all users from API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users); // Set fetched users
      });
  }, []);

  useEffect(() => {
    if (!userLocation) return; // Wait until user location is available

    // Filter users based on the role and distance
    const filtered = users.filter((user) => {
      const distance = haversineDistance(user.location.coordinates, userLocation); // Calculate distance
      return distance <= radius && user.addwork.some((work) => work.role === role); // Check distance and role match
    });
    setFilteredUsers(filtered); // Set filtered users
  }, [users, userLocation, role]); // Dependencies: users, userLocation, role

  // Handle image click to open in modal
  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="container mx-auto p-4 mb-20">
      <h2 className="text-2xl font-bold mb-4">Workers for role: {role}</h2>
      {error && <p className="text-red-500">{error}</p>} {/* Show error if location fetch fails */}
      {!userLocation && !error && (
        <p className="text-gray-500">Fetching your location...</p> 
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userLocation && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-purple-600 shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.photo}
                  alt={user.username}
                  className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer"
                  onClick={() => handleImageClick(user.photo)}
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{user.username}</h3>
                  <div className="flex items-center space-x-2 text-white mt-2">
                    <a
                      href={`tel:${user.phonenumber}`}
                      className="flex items-center space-x-1 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaPhone />
                      <span>Call</span>
                    </a>
                    <a
                      href={`mailto:${user.email}`}
                      className="flex items-center space-x-1 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaEnvelope />
                      <span>Email</span>
                    </a>
                    <a
                      href={`https://wa.me/+91${user.phonenumber}`}
                      className="flex items-center space-x-1 cursor-pointer"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
              <h4 className="text-md font-semibold text-white mt-4">Works:</h4>
              {user.addwork
                .filter((work) => work.role === role)
                .map((work) => (
                  <div key={work._id}>
                    <p>
                      <strong className="text-white">Experience: {work.experience} years</strong>
                    </p>
                    <div className="flex space-x-4 overflow-x-auto mt-2">
                      {work.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Work ${work.role} - ${index}`}
                          className="w-16 h-16 rounded-lg border border-gray-300 cursor-pointer"
                          onClick={() => handleImageClick(photo)} // Click handler to open image
                        />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found for this role within the radius.</p>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal} // Close modal on click outside the image
        >
          <div className="bg-white p-4 rounded shadow-lg">
            <img
              src={selectedImage}
              alt="Selected Work"
              className="max-w-full max-h-screen"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
