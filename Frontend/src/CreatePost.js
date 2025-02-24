// CreatePost.js
import React, { useState } from 'react';

function CreatePost({ onCreatePost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { id: Date.now(), title, content };
    onCreatePost(newPost);
    setTitle('');
    setContent('');
  };

  return (
    <>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
        />
        <textarea
          value={content}
          name="content"
          onChange={(e) => setContent(e.target.value)}
          placeholder="Post content"
        />
        <button type="submit">Create Post</button>
      </form>
    </>
  );
}

export default CreatePost;