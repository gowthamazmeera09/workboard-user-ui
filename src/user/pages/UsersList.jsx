import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://workboard-backend.onrender.com/user/all-users";

function UsersList() {
  const { role } = useParams();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all users
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    // Filter users based on the role
    const filtered = users.filter((user) =>
      user.addwork.some((work) => work.role === role)
    );
    setFilteredUsers(filtered);
  }, [users, role]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Workers for role: {role}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className="bg-purple-600 shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => setSelectedImage(user.photo)}
              >
                <img
                  src={user.photo}
                  alt={user.username}
                  className="w-16 h-16 rounded-full border border-gray-300"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-white">{user.username}</h3>
                  <p className="text-sm  text-white">{user.email}</p>
                  <p className="text-sm  text-white">{user.phonenumber}</p>
                </div>
              </div>
              <h4 className="text-md font-semibold text-white">Works:</h4>
              {user.addwork
                .filter((work) => work.role === role)
                .map((work) => (
                  <div key={work._id} className="mt-2">
                    <p>
                      <strong className="text-white">Location: {work.location}</strong>
                    </p>
                    <p>
                      <strong className="text-white">Experience: {work.experience} years </strong>
                    </p>
                    <div className="flex overflow-x-auto gap-2 mt-2">
                      <div className="flex gap-2">
                        {work.photos.map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt="work"
                            className="w-16 h-16 object-cover rounded-md border border-gray-300 cursor-pointer"
                            onClick={() => setSelectedImage(photo)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No users found for this role.</p>
        )}
      </div>

      {/* Modal for Enlarged Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full rounded-lg"
          />
        </div>
      )}
    </div>
  );
}

export default UsersList;
