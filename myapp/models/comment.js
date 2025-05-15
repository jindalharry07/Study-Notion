// models/comment.js
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: 'Learner' },
  text: String,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.models.ModelName || mongoose.model('Comment', commentSchema);

