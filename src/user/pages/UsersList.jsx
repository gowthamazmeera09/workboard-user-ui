import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { haversineDistance } from "./Utils";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";

const API_URL = "https://workboard-backend.onrender.com/user/all-users";

const UsersList = () => {
  const { role } = useParams();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const radius = 15;

  // State to track payment status for workers
  const [paidWorkers, setPaidWorkers] = useState(
    JSON.parse(localStorage.getItem("paidWorkers")) || {}
  );

  useEffect(() => {
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
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    if (!userLocation) return;

    const filtered = users.filter((user) => {
      const distance = haversineDistance(user.location.coordinates, userLocation);
      return distance <= radius && user.addwork.some((work) => work.role === role);
    });
    setFilteredUsers(filtered);
  }, [users, userLocation, role]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handlePayment = (workerId) => {
    const options = {
      key: "your_razorpay_key",
      amount: 100, // ₹1 in paise
      currency: "INR",
      name: "Worker Details Payment",
      description: "Pay ₹1 to view contact details for the day",
      handler: function (response) {
        // On successful payment, grant access to the worker's details
        const updatedPaidWorkers = { ...paidWorkers, [workerId]: Date.now() };
        setPaidWorkers(updatedPaidWorkers);
        localStorage.setItem("paidWorkers", JSON.stringify(updatedPaidWorkers));
        alert("Payment successful! You can now view the worker's contact details.");
      },
      prefill: {
        name: "Your Name",
        email: "your-email@example.com",
        contact: "your-phone-number",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const isPaymentValid = (workerId) => {
    const paidTime = paidWorkers[workerId];
    if (!paidTime) return false;

    // Check if the payment is within the last 24 hours
    const oneDay = 24 * 60 * 60 * 1000;
    return Date.now() - paidTime < oneDay;
  };

  return (
    <div className="container mx-auto p-4 mb-20">
      <h2 className="text-2xl font-bold mb-4">Workers for role: {role}</h2>
      {error && <p className="text-red-500">{error}</p>}
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
                </div>
              </div>
              <h4 className="text-md font-semibold text-white mt-4">Works:</h4>
              {user.addwork
                .filter((work) => work.role === role)
                .map((work) => (
                  <div key={work._id}>
                    <p className="text-white mt-4">{work.experience}</p>
                    <div className="flex space-x-4 overflow-x-auto mt-2">
                      {work.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`Work ${work.role} - ${index}`}
                          className="w-16 h-16 rounded-lg border border-gray-300 cursor-pointer"
                          onClick={() => handleImageClick(photo)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              <div className="flex items-center space-x-2 text-white mt-4">
                {isPaymentValid(user._id) ? (
                  <>
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
                  </>
                ) : (
                  <button
                    onClick={() => handlePayment(user._id)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Pay ₹1 to View Contact
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found for this role within the radius.</p>
        )}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
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
