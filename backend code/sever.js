const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();

dotenv.config(); // Load .env first

const app = express(); // ✅ Create the app early

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const jobRoutes = require('./routes/jobRoutes');

app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log('✅ Server running on port 5000');
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));