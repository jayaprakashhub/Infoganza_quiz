const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const submissionRoutes = require('./routes/submission');

const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
app.use(cors({
  origin: [
    'https://infoganza.onrender.com',
    'https://infoganza-admin.onrender.com'
  ],
  credentials: true, // optional if you use cookies/sessions
}));// Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api', submissionRoutes); // Register submission routes

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
