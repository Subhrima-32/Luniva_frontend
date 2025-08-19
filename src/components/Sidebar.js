import React from 'react';

export default function Sidebar({ onNavigate }) {
  const menuItems = [
    'Home', 'Search',
    'Messages', 'Notifications', 'Create',
    'Dashboard', 'Profile'
  ];

  return (
    <nav style={{ width: 200, padding: 20, borderRight: '1px solid #ddd', height: '100vh' }}>
      <h2 style={{ marginBottom: 30 }}>Luniva</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map(item => (
          <li
            key={item}
            style={{
              marginBottom: 15,
              cursor: 'pointer',
              fontWeight: 'bold',
              color: '#0095f6'
            }}
            onClick={() => onNavigate(item.toLowerCase())}
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
