const express = require('express');
const app = express();
app.use(express.json());

let posts = [
    { id: 1, title: "First Post", content: "This is my first post!", author: "Admin", likes: 0 },
    { id: 2, title: "Second Post", content: "Learning Node.js is fun!", author: "User1", likes: 3 }
];

let comments = [];
let users = [];

// Get all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

// Get a single post
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        res.json(post);
    } else {
        res.status(404).send("Post not found");
    }
});

// Create a new post
app.post('/posts', (req, res) => {
    const newPost = { id: posts.length + 1, ...req.body, likes: 0 };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Update a post
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        Object.assign(post, req.body);
        res.json(post);
    } else {
        res.status(404).send("Post not found");
    }
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Like a post
app.post('/posts/:id/like', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        post.likes += 1;
        res.json(post);
    } else {
        res.status(404).send("Post not found");
    }
});

// Add a comment to a post
app.post('/posts/:id/comments', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (post) {
        const newComment = { id: comments.length + 1, postId: post.id, ...req.body };
        comments.push(newComment);
        res.status(201).json(newComment);
    } else {
        res.status(404).send("Post not found");
    }
});

// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
    const postComments = comments.filter(c => c.postId === parseInt(req.params.id));
    res.json(postComments);
});

// Register a new user
app.post('/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(3000, () => console.log('Blog API is running on http://localhost:3000'));
