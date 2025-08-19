import React, { useState } from 'react';

export default function CreatePost({ onAddPost }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() === '') return;

    onAddPost({
      id: Date.now(),
      content,
      author: 'You',
      likes: 0,
      createdAt: new Date().toLocaleString(),
    });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: 10 }}
      />
      <button type="submit" style={{ marginTop: 5, padding: '8px 12px', cursor: 'pointer' }}>
        Post
      </button>
    </form>
  );
}
