const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: {
    type: [String], // 4 options
    validate: [arr => arr.length === 4, 'Must have exactly 4 options']
  },
  correctAnswerIndex: {
    type: Number, // 0 to 3
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz'
  }
});

module.exports = mongoose.model('Question', questionSchema);
