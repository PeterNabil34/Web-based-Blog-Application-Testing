import React from 'react';

function Navbar({ user, setSelectedPage, onLogout }) {
  return (
    <nav className="navbar">
      <h1>Blog Admin Panel</h1>
      <ul>
        <li onClick={() => setSelectedPage('allPosts')}>All Posts</li>
        {user === "admin" ? <li onClick={() => setSelectedPage('createPost')}>Create Post</li> : ""}
        {user === "admin" ? <li onClick={() => {onLogout(); setSelectedPage('allPosts')}}>Logout</li> : ""}
        {user !== "admin" ? <li onClick={() => setSelectedPage('login')}>Login</li> : ""}
      </ul>
    </nav>
  );
}

export default Navbar;