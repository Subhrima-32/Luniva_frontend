import React from 'react';
import PostCard from './PostCard';

const posts = [
  {
    id: 1,
    image: '/assets/images/post1.jpg',
    caption: 'Beautiful sunset at the beach!',
  },
  {
    id: 2,
    image: '/assets/images/post2.jpg',
    caption: 'Luniva app coming together!',
  },
];

export default function Feed() {
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
