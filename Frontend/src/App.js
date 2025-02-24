import React, { useState } from 'react';
import Navbar from './Navbar.js';
import CreatePost from './CreatePost.js';
import PostsList from './PostsList.js';
import PostDetails from './PostDetails.js';
import Login from './Login.js';
import "./style.css";

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'First Blog Post',
      content: 'This is the content of the first blog post.',
      comments: [
        {
          id: 1,
          text: 'Great post!',
          commenter: 'Alice',
          replies: [
            { id: 1, text: 'Thanks!', commenter: 'Bob' }
          ]
        },
        {
          id: 2,
          text: 'I found this very helpful!',
          commenter: 'Charlie',
          replies: []
        }
      ]
    },
    {
      id: 2,
      title: 'Another Post',
      content: 'This is another post.',
      comments: [
        {
          id: 3,
          text: 'Interesting thoughts.',
          commenter: 'Dave',
          replies: []
        }
      ]
    }
  ]);

  const [selectedPage, setSelectedPage] = useState('allPosts');
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState('');

  const handleLogin = (username, password) => {
    // Validate credentials
    if (username === 'admin' && password === 'admin123') {
      setUser(username);
      setError('');
      setSelectedPage("allPosts");
    } else {
      setError('Invalid Credentials');
    }
  };

  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
    setSelectedPage('allPosts');
  };

  const handleViewPost = (postId) => {
    const post = posts.find((p) => p.id === postId);
    setSelectedPost(post);
    setSelectedPage('postDetails');
  };

  return (
    <div>
        <Navbar user={user} setSelectedPage={setSelectedPage} onLogout={() => setUser(null)}/>
        {selectedPage === 'allPosts' && (
          <PostsList posts={posts} onViewPost={handleViewPost} />
        )}
        {selectedPage === 'createPost' && (
          <CreatePost onCreatePost={handleCreatePost} />
        )}
        {selectedPage === 'postDetails' && selectedPost && (
          <PostDetails post={selectedPost} />
        )}
        {selectedPage === 'login' && (
          <Login onLogin={handleLogin} loginError={error} />
        )}
    </div>
  );
}

export default App;
