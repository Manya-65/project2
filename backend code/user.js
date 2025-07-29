const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['seeker', 'employer'], required: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  skills: [String],
  company: String,
});

module.exports = mongoose.model('User', userSchema);