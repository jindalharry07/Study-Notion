const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: String,
  filePath: String,
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Instructor'
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.PDF || mongoose.model('PDF', pdfSchema);
