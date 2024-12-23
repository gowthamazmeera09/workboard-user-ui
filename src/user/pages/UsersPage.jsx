import React, { useEffect, useState } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const API_URL = "https://workboard-backend.onrender.com/user/all-users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="users-container p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="user-card border rounded-lg p-4 shadow-md">
            <img
              src={user.photo}
              alt={user.username}
              className="rounded-full w-24 h-24 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-center">{user.username}</h2>
            <p className="text-center text-sm text-gray-600">{user.email}</p>
            <h3 className="mt-4 font-bold">Work Details:</h3>
            <ul className="list-disc ml-4 text-sm">
              {user.addwork.map((work) => (
                <li key={work._id}>
                  <strong>Role:</strong> {work.role}<br />
                  <strong>Experience:</strong> {work.experience} years<br />
                  <strong>Location:</strong> {work.location}<br />
                  <strong>Photos:</strong>
                  {work.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt="Work"
                      className="w-20 h-20 mt-2 inline-block"
                    />
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersPage;
