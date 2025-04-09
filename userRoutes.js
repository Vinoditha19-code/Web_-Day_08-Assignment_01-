//userRoutes.js

const express = require('express');
 const router = express.Router();
 const users = require('../data/users');
 const posts = require('../data/posts');
 const comments = require('../data/comments');
 
 // 1. User summary
 router.get('/summary/:id', (req, res) => {
   const user = users.find(u => u.id === req.params.id);
   if (!user) return res.status(404).json({ message: 'User not found' });
 
   const userPosts = posts.filter(p => p.authorId === user.id);
   const userComments = comments.filter(c => c.userId === user.id);
 
   res.json({
     id: user.id,
     username: user.username,
     email: user.email,
     fullName: user.fullName,
     "Number of Post": userPosts.length,
     "Number of comments": userComments.length
   });
 });
 
 // User filter route: /user/filter?username=john
 router.get('/filter', (req, res) => {
     const { username, email } = req.query;
     let filteredUsers = users;
   
     // Filter by username if provided
     if (username) {
       filteredUsers = filteredUsers.filter(u => u.username.toLowerCase().includes(username.toLowerCase()));
     }
   
     // Filter by email if provided
     if (email) {
       filteredUsers = filteredUsers.filter(u => u.email.toLowerCase().includes(email.toLowerCase()));
     }
   
     // Return filtered users
     res.json(filteredUsers);
   });
 
 module.exports = router;