import React from 'react';

function PostsList({ posts, onViewPost }) {
  return (
    <div className="posts-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => onViewPost(post.id)}>View Post</button>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
}

export default PostsList;