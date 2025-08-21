import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Search from './Search';
import Messages from './Messages';
import CreatePost from './Createpost';
import Dashboard from './Dashboard';
import Notifications from './Notifications';
import Profile from './Profile';

export default function LunivaHome({ user, onLogout }) {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'ankit',
      content: 'This is my first post!',
      likes: 5,
      createdAt: '2025-08-10 10:00',
      followers: 10,
      isFollowing: true,
      liked: false,
      comments: [],
      showComment: false
    },
    {
      id: 2,
      author: 'lensor',
      content: 'Hello from Lensor!',
      likes: 3,
      createdAt: '2025-08-10 11:00',
      followers: 7,
      isFollowing: false,
      liked: false,
      comments: [],
      showComment: false
    },
    {
      id: 3,
      author: 'Shubh',
      content: 'I Love Biryani',
      likes: 100,
      createdAt: '2025-08-10 11:30',
      followers: 50,
      isFollowing: true,
      liked: false,
      comments: [],
      showComment: false
    },
    {
      id: 4,
      author: 'You',
      content: 'Happy Independence Day!',
      likes: 33,
      createdAt: '2025-08-15 11:30',
      followers: 50,
      isFollowing: true,
      liked: false,
      comments: [],
      showComment: false
    },
  ]);

  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [chatTarget, setChatTarget] = useState(null); // 👈 who we are messaging

  const handleAddPost = (post) => {
    setPosts([post, ...posts]);
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Follow toggle
  const toggleFollow = (username) => {
    setPosts(posts.map(post => {
      if (post.author === username) {
        const newFollowStatus = !post.isFollowing;
        return {
          ...post,
          isFollowing: newFollowStatus,
          followers: newFollowStatus ? post.followers + 1 : post.followers - 1
        };
      }
      return post;
    }));
  };

  // Add comment to a post
  const addComment = (postId, commentText) => {
    if (!commentText.trim()) return;

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, commentText] }
        : post
    ));
  };

  // Open Profile Page
  const openProfile = (username) => {
    setSelectedProfile(username);
    setCurrentPage('profile');
  };

  // Collect profile stats
  const getProfileData = (username) => {
    const userPosts = posts.filter(p => p.author === username);
    const totalLikes = userPosts.reduce((sum, p) => sum + p.likes, 0);
    const followers = userPosts.length > 0 ? userPosts[0].followers : 0;
    const isFollowing = userPosts.length > 0 ? userPosts[0].isFollowing : false;

    return {
      username,
      posts: userPosts.length,
      likes: totalLikes,
      followers,
      isFollowing,
      postsList: userPosts
    };
  };

  // Open chat with user
  const handleMessageUser = (username) => {
    setChatTarget(username);
    setCurrentPage('messages');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar onNavigate={handleNavigate} />

      <main style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <h1 style={{ color: '#c13584' }}>Luniva</h1>
          <div>
            <span style={{ marginRight: 15 }}>Welcome, {user.fullName || user.email}!</span>
            <button onClick={onLogout} style={{ cursor: 'pointer' }}>Logout</button>
          </div>
        </header>

        {currentPage === 'home' && (
          <>
            <CreatePost onAddPost={handleAddPost} />
            {posts.map(post => (
              <article key={post.id} style={{ border: '1px solid #ddd', borderRadius: 8, marginBottom: 20, padding: 10 }}>
                <header 
                  style={{ fontWeight: 'bold', marginBottom: 5, color: 'purple', cursor: 'pointer' }}
                  onClick={() => openProfile(post.author)}  // 👈 CLICK TO OPEN PROFILE
                >
                  {post.author}
                </header>
                <p>{post.content}</p>
                
                <footer style={{ fontSize: 12, color: '#555', marginTop: 5 }}>
                  {post.likes} likes · {post.createdAt}  
                  <br />
                  Followers: {post.followers}
                  <br />
                  <button 
                    style={{
                      marginTop: 5, 
                      backgroundColor: post.isFollowing ? '#ddd' : '#c13584', 
                      color: post.isFollowing ? '#000' : '#fff', 
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleFollow(post.author)}
                  >
                    {post.isFollowing ? 'Unfollow' : 'Follow'}
                  </button>

                  {/* Like, Comment, Share */}
                  <div style={{ display: 'flex', gap: '15px', marginTop: 10 }}>
                    <button
                      onClick={() => setPosts(posts.map(p =>
                        p.id === post.id
                          ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
                          : p
                      ))}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                    >
                      <span style={{ color: post.liked ? 'red' : 'gray', fontWeight: 'bold' }}>❤️</span>
                      <span>{post.likes}</span>
                    </button>

                    <button
                      onClick={() => setPosts(posts.map(p =>
                        p.id === post.id ? { ...p, showComment: !p.showComment } : p
                      ))}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                    >
                      💬 Comment
                    </button>

                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`Post link: http://localhost:3000/post/${post.id}`);
                        alert("Post link copied to clipboard!");
                      }}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}
                    >
                      🔗 Share
                    </button>
                  </div>

                  {/* Comment Section */}
                  {post.showComment && (
                    <div style={{ marginTop: 10 }}>
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        style={{ width: '80%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            addComment(post.id, e.target.value);
                            e.target.value = '';
                          }
                        }}
                      />
                      <button
                        style={{ marginLeft: 5, padding: '5px 10px', borderRadius: '5px', backgroundColor: '#c13584', color: '#fff', border: 'none', cursor: 'pointer' }}
                        onClick={(e) => {
                          const input = e.target.previousSibling;
                          addComment(post.id, input.value);
                          input.value = '';
                        }}
                      >
                        Post
                      </button>

                      {/* Display comments */}
                      <div style={{ marginTop: 10 }}>
                        {post.comments.map((comment, index) => (
                          <div key={index} style={{ fontSize: 12, padding: '3px 0' }}>
                            <b>User:</b> {comment}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </footer>
              </article>
            ))}
          </>
        )}

        {currentPage === 'search' && <Search />}
        {currentPage === 'messages' && <Messages chatTarget={chatTarget} />} {/* pass chat target */}
        {currentPage === 'create' && <CreatePost onAddPost={handleAddPost} />}
        {currentPage === 'dashboard' && <Dashboard />}
        {currentPage === 'notifications' && <Notifications />}
        
        {currentPage === 'profile' && selectedProfile && (
          <div style={{ padding: 20, border: '1px solid #ddd', borderRadius: 8 }}>
            {(() => {
              const profile = getProfileData(selectedProfile);
              return (
                <>
                  <h2 style={{ color: '#c13584' }}>@{profile.username}</h2>
                  <p><b>Posts:</b> {profile.posts}</p>
                  <p><b>Total Likes:</b> {profile.likes}</p>
                  <p><b>Followers:</b> {profile.followers}</p>
                  
                  <button
                    onClick={() => toggleFollow(profile.username)}
                    style={{
                      backgroundColor: profile.isFollowing ? '#ddd' : '#c13584',
                      color: profile.isFollowing ? '#000' : '#fff',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      marginRight: 10
                    }}
                  >
                    {profile.isFollowing ? 'Unfollow' : 'Follow'}
                  </button>

                  {/* 👇 NEW MESSAGE BUTTON */}
                  <button
                    onClick={() => handleMessageUser(profile.username)}
                    style={{
                      backgroundColor: '#0084ff',
                      color: '#fff',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Message
                  </button>

                  {/* Show all posts of this user */}
                  <div style={{ marginTop: 20 }}>
                    <h3>{profile.username}'s Posts</h3>
                    {profile.postsList.map(p => (
                      <div key={p.id} style={{ border: '1px solid #ccc', padding: 10, marginTop: 10, borderRadius: 6 }}>
                        <p>{p.content}</p>
                        <small>{p.likes} likes</small>
                      </div>
                    ))}
                  </div>

                  <br />
                  <button onClick={() => setCurrentPage('home')} style={{ cursor: 'pointer' }}>⬅ Back to Home</button>
                </>
              );
            })()}
          </div>
        )}
      </main>
    </div>
  );
}
