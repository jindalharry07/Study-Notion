// models/Learner.js
const mongoose = require('mongoose');

const learnerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
    // in production you’d hash this!
  }
}, { timestamps: true });

module.exports = mongoose.model('Learner', learnerSchema);
