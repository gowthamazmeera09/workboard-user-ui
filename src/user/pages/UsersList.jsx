import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { haversineDistance } from "./Utils";
import { FaPhone, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import AttendanceBox from "../components/AttendanceBox";
import ExpiredAttendanceBox from "../components/ExpiredAttendanceBox";

const API_URL = "https://workboard-backend.onrender.com/user/all-users";

const UsersList = () => {
  const { role } = useParams();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const radius = 15;

  const monthlyRoles = ["watchman", "driver", "teacher", "kidscaretaker", "oldpeoplecaretaker"];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([longitude, latitude]);
      },
      () => {
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

    const filtered = users
      .map((user) => {
        const distance = haversineDistance(user.location.coordinates, userLocation);
        return { ...user, distance };
      })
      .filter((user) => user.distance <= radius && user.addwork.some((work) => work.role === role));

    setFilteredUsers(filtered);
  }, [users, userLocation, role]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handlePayment = (userId) => {
    const isMonthly = monthlyRoles.includes(role);
    const amount = isMonthly ? 9900 : 300;
    const paymentKey = isMonthly ? `monthly_paid_${userId}` : `paid_${userId}`;

    const razorpay = new window.Razorpay({
      key: "rzp_live_OqzosWrCVboRcu",
      amount: amount,
      currency: "INR",
      name: "WorkBoard",
      description: isMonthly ? "Monthly worker contact access" : "Worker contact access for 1 day",
      handler: function () {
        localStorage.setItem(paymentKey, Date.now());
        window.location.reload();
      },
      prefill: {
        email: "user@example.com",
        contact: "9876543210",
      },
      theme: { color: "#6D28D9" },
    });
    razorpay.open();
  };

  const isPaymentValid = (userId) => {
    const isMonthly = monthlyRoles.includes(role);
    const paymentKey = isMonthly ? `monthly_paid_${userId}` : `paid_${userId}`;
    const paymentTime = localStorage.getItem(paymentKey);
    if (!paymentTime) return false;
    const duration = isMonthly ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
    return Date.now() - paymentTime < duration;
  };

  return (
    <div className="container mx-auto p-4 mb-20">
      <h2 className="text-2xl font-bold mb-4">Workers for role: {role}</h2>
      {error && <p className="text-red-500">{error}</p>}
      {!userLocation && !error && <p className="text-gray-500">Fetching your location...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {userLocation && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="bg-purple-600 shadow-lg rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={user.photo}
                  alt={user.username}
                  className="w-16 h-16 rounded-full border border-gray-300 cursor-pointer"
                  onClick={() => handleImageClick(user.photo)}
                />
                <div>
                  <h3 className="text-lg font-bold text-white">{user.username}</h3>
                  <p className="text-sm text-white">📍 {user.distance.toFixed(2)} km away</p>

                  {isPaymentValid(user._id) ? (
                    <>
                      <div className="flex items-center space-x-2 text-white mt-2">
                        <a href={`tel:${user.phonenumber}`} className="flex items-center space-x-1 cursor-pointer">
                          <FaPhone /> <span>Call</span>
                        </a>
                        <a href={`mailto:${user.email}`} className="flex items-center space-x-1 cursor-pointer">
                          <FaEnvelope /> <span>Email</span>
                        </a>
                        <a href={`https://wa.me/+91${user.phonenumber}`} className="flex items-center space-x-1 cursor-pointer">
                          <FaWhatsapp /> <span>WhatsApp</span>
                        </a>
                      </div>
                      {monthlyRoles.includes(role) && (
                        <>
                          <AttendanceBox userId={user._id} />
                          <ExpiredAttendanceBox userId={user._id} />
                        </>
                      )}

                    </>
                  ) : (
                    <button
                      onClick={() => handlePayment(user._id)}
                      className="bg-yellow-500 text-black px-4 py-2 mt-2 rounded-md shadow-lg"
                    >
                      {monthlyRoles.includes(role)
                        ? "Pay ₹99 to Unlock Monthly Contact"
                        : "Pay ₹3 to Unlock Contact"}
                    </button>
                  )}
                </div>
              </div>

              <h4 className="text-md font-semibold text-white mt-4">Works:</h4>
              {user.addwork.filter((work) => work.role === role).map((work) => (
                <div key={work._id}>
                  <div className="text-white mt-2">
                    {work.experience && <p><strong>Experience:</strong> {work.experience}</p>}
                    {work.standard && <p><strong>Standard:</strong> {work.standard}</p>}
                    {work.subject && <p><strong>Subject:</strong> {work.subject}</p>}
                    {work.vehicletype && <p><strong>Vehicle Type:</strong> {work.vehicletype}</p>}
                    {work.paintertype && <p><strong>Paintertype:</strong> {work.paintertype}</p>}
                    {work.cartype && <p><strong>Cartype:</strong> {work.cartype}</p>}
                    {work.biketype && <p><strong>Biketype:</strong> {work.biketype}</p>}
                    {work.autotype && <p><strong>Autotype:</strong> {work.autotype}</p>}
                    {work.shoottype && <p><strong>Shoottype:</strong> {work.shoottype}</p>}
                    {work.marbultype && <p><strong>Marbultype:</strong> {work.marbultype}</p>}
                    {work.weldingtype && <p><strong>Weldingtype:</strong> {work.weldingtype}</p>}
                  </div>

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
            <img src={selectedImage} alt="Selected Work" className="max-w-full max-h-screen" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
