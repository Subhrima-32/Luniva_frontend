import React, { useState } from 'react';

const allUsersInitial = [
{ id: 1, name: 'ankit', followed: false },
{ id: 2, name: 'lensor', followed: false },
{ id: 3, name: 'chakra', followed: false },
{ id: 4, name: 'shoumili', followed: false },
{ id: 5, name: 'curlh', followed: false },
{ id: 6, name: 'testuser', followed: false },
{ id: 7, name: 'alice', followed: false },
{ id: 8, name: 'bob', followed: false },
{ id: 9, name: 'charlie', followed: false },
{ id: 10, name: 'Subhrima', followed: false },
{ id: 11, name: 'Sayan', followed: false },
{ id: 12, name: 'Subho', followed: false },
{ id: 13, name: 'Uttam', followed: false },
{ id: 14, name: 'Vikram', followed: false },
{ id: 15, name: 'Anjali', followed: false },
{ id: 16, name: 'Rohan', followed: false },
{ id: 17, name: 'Priya', followed: false },
{ id: 18, name: 'Karan', followed: false },
{ id: 19, name: 'Neha', followed: false },
{ id: 20, name: 'Amit', followed: false },
{ id: 21, name: 'Sneha', followed: false },
{ id: 22, name: 'Rahul', followed: false },
{ id: 23, name: 'Pooja', followed: false },
{ id: 24, name: 'Deepak', followed: false },
{ id: 25, name: 'Divya', followed: false },
{ id: 26, name: 'Suresh', followed: false },
{ id: 27, name: 'Kavita', followed: false },
{ id: 28, name: 'Ajay', followed: false },
{ id: 29, name: 'Ritu', followed: false },
{ id: 30, name: 'Manish', followed: false },
{ id: 31, name: 'Neelam', followed: false },
{ id: 32, name: 'Sanjay', followed: false },
{ id: 33, name: 'Rekha', followed: false },
{ id: 34, name: 'Vikas', followed: false },
{ id: 35, name: 'Sapna', followed: false },
{ id: 36, name: 'Rajesh', followed: false },
{ id: 37, name: 'Sunita', followed: false },
{ id: 38, name: 'Aakash', followed: false },
{ id: 39, name: 'Sheetal', followed: false },
{ id: 40, name: 'Ramesh', followed: false },
{ id: 41, name: 'Anita', followed: false },
{ id: 42, name: 'Kunal', followed: false },
{ id: 43, name: 'Shweta', followed: false },
{ id: 44, name: 'Harish', followed: false },
{ id: 45, name: 'Meena', followed: false },
{ id: 46, name: 'Nikhil', followed: false },
{ id: 47, name: 'Alka', followed: false },
{ id: 48, name: 'Siddharth', followed: false },
{ id: 49, name: 'Rashmi', followed: false },
{ id: 50, name: 'Vijay', followed: false },
{ id: 51, name: 'Madhuri', followed: false },
{ id: 52, name: 'Arjun', followed: false },
{ id: 53, name: 'Lata', followed: false },
{ id: 54, name: 'Sahil', followed: false },
{ id: 55, name: 'Divya', followed: false },
{ id: 56, name: 'Gaurav', followed: false },
{ id: 57, name: 'Priyanka', followed: false },
{ id: 58, name: 'Vijaya', followed: false },
{ id: 59, name: 'Tarun', followed: false },
{ id: 60, name: 'Bhavna', followed: false },

];

export default function Search() {
  const [query, setQuery] = useState('');
  const [allUsers, setAllUsers] = useState(allUsersInitial);

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );

  const toggleFollow = (id) => {
    setAllUsers(allUsers.map(user =>
      user.id === id ? { ...user, followed: !user.followed } : user
    ));
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>Search Users</h2>
      <input
        type="text"
        placeholder="Search by username..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: 10,
          marginBottom: 20,
          fontSize: 16,
          borderRadius: 4,
          border: '1px solid #ccc',
        }}
      />

      {/* Show results only if there is a search query */}
      {query.trim() !== '' && (
        filteredUsers.length > 0 ? (
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {filteredUsers.map(user => (
              <li
                key={user.id}
                style={{
                  padding: 10,
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span>{user.name}</span>
                <button
                  onClick={() => toggleFollow(user.id)}
                  style={{
                    padding: '5px 12px',
                    cursor: 'pointer',
                    backgroundColor: user.followed ? '#ccc' : '#0095f6',
                    color: user.followed ? '#555' : 'white',
                    border: 'none',
                    borderRadius: 4,
                  }}
                >
                  {user.followed ? 'Unfollow' : 'Follow'}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users found.</p>
        )
      )}
    </div>
  );
}
