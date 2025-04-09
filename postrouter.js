//postrouter.js

const express = require('express');
 const router = express.Router();
 const users = require('../data/users');
 const posts = require('../data/posts');
 const comments = require('../data/comments');
 
 // 2. Comments of a specific post
 router.get('/:id', (req, res) => {
   const post = posts.find(p => p.id === req.params.id);
   if (!post) return res.status(404).json({ message: 'Post not found' });
 
   const postComments = comments.filter(c => c.postId === req.params.id)
     .map(comment => {
       const user = users.find(u => u.id === comment.userId);
       return {
         commentator: user ? user.fullName : 'Unknown',
         comment: comment.content
       };
     });
 
   res.json(postComments);
 });
 
 // Post filter route: /post/filter?authorId=1&title=Tips
 router.get('/filter', (req, res) => {
     const { authorId, title } = req.query;
     let filteredPosts = posts;
   
     // Filter by authorId if provided
     if (authorId) {
       filteredPosts = filteredPosts.filter(p => p.authorId === parseInt(authorId, 10));
     }
   
     // Filter by title if provided
     if (title) {
       filteredPosts = filteredPosts.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));
     }
   
     // Return filtered posts
     res.json(filteredPosts);
   });
 
 module.exports = router;