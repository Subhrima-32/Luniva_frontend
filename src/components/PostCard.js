import React from 'react';

export default function PostCard({ post }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: 8,
      marginBottom: 20,
      backgroundColor: '#fff',
      maxWidth: 600
    }}>
      <img src={post.image} alt="post" style={{ width: '100%', borderRadius: '8px 8px 0 0' }} />
      <div style={{ padding: 10 }}>
        <p>{post.caption}</p>
      </div>
    </div>
  );
}
