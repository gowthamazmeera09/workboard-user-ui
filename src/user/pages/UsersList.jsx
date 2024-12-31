import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { haversineDistance } from './Utils'; // Import your haversine function

const API_URL = "https://workboard-backend.onrender.com/user/all-users";

const UsersList = () => {
  const { role } = useParams(); // Extract the role from URL
  const [users, setUsers] = useState([]); // State to store fetched users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users state
  const userLocation = [80.8567972, 17.6950348]; // Replace with actual user location coordinates
  const radius = 15; // Radius in km

  useEffect(() => {
    // Fetch all users from API
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users); // Set fetched users
      });
  }, []);

  useEffect(() => {
    // Filter users based on the role and distance
    const filtered = users.filter((user) => {
      const distance = haversineDistance(user.location.coordinates, userLocation); // Calculate distance
      return distance <= radius && user.addwork.some((work) => work.role === role); // Check distance and role match
    });
    setFilteredUsers(filtered); // Set filtered users
  }, [users, userLocation, role]); // Dependencies: users, userLocation, role

  return (
    <div className="container mx-auto p-4 mb-20">
      <h2 className="text-2xl font-bold mb-4">Workers for role: {role}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-purple-600 shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <img
                src={user.photo}
                alt={user.username}
                className="w-16 h-16 rounded-full border border-gray-300"
              />
              <h3 className="text-lg font-bold text-white">{user.username}</h3>
              <p className="text-sm text-white">{user.email}</p>
              <p className="text-sm text-white">{user.phonenumber}</p>
              <h4 className="text-md font-semibold text-white">Works:</h4>
              {user.addwork
                .filter((work) => work.role === role)
                .map((work) => (
                  <p key={work._id}>
                    <strong className="text-white">Experience: {work.experience} years</strong>
                  </p>
                ))}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found for this role within the radius.</p>
        )}
      </div>
    </div>
  );
};

export default UsersList;
