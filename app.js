//app.js

const express = require('express');
 const app = express();
 
 const userRoutes = require('./routes/userRoutes');
 const postRoutes = require('./routes/postRoutes');
 
 // Use routes
 app.use('/user', userRoutes);
 app.use('/post', postRoutes);
 
 // Handle invalid routes (bonus point for Q3)
 app.use((req, res) => {
   res.status(404).json({ message: 'Route not found' });
 });
 
 const PORT = 8080;
 app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
 });