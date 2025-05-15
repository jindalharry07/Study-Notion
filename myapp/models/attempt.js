// models/attempt.js
const mongoose = require('mongoose');
const attemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner' },
  score: Number,
  submittedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.models.ModelName || mongoose.model('Attempt',attemptSchema);

