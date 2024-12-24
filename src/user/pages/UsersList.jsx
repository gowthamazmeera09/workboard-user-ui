import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = "https://workboard-backend.onrender.com/user/all-users";

function UsersList() {
  const { role } = useParams();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

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
    <div>
      <h2>Users for role: {role}</h2>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <div
            key={user._id}
            style={{
              border: '1px solid #ccc',
              margin: '10px',
              padding: '10px',
            }}
          >
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phonenumber}</p>
            <img src={user.photo} alt={user.username} width="100" />
            <h4>Works:</h4>
            {user.addwork
              .filter((work) => work.role === role)
              .map((work) => (
                <div key={work._id}>
                  <p>Location: {work.location}</p>
                  <p>Experience: {work.experience} years</p>
                  {work.photos.map((photo, index) => (
                    <img key={index} src={photo} alt="work" width="100" />
                  ))}
                </div>
              ))}
          </div>
        ))
      ) : (
        <p>No users found for this role.</p>
      )}
    </div>
  );
}

export default UsersList;
