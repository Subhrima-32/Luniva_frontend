import React from 'react';

const profiles = [
  { id: 1, name: 'Alice', img: '/assets/images/alice.jpg' },
  { id: 2, name: 'Bob', img: '/assets/images/bob.jpg' },
  // Add more profiles here
];

export default function StoriesCarousel() {
  return (
    <div style={{
      display: 'flex',
      overflowX: 'auto',
      padding: '10px 0',
      borderBottom: '1px solid #ddd',
    }}>
      {profiles.map(profile => (
        <div key={profile.id} style={{ marginRight: 15, textAlign: 'center' }}>
          <img 
            src={profile.img} 
            alt={profile.name} 
            style={{ 
              width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid purple' 
            }} 
          />
          <div style={{ fontSize: 12 }}>{profile.name}</div>
        </div>
      ))}
    </div>
  );
}
