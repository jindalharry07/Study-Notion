const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
  fileUrl: String, // Optional: If you're storing uploaded resources
}, { timestamps: true });

module.exports = mongoose.models.Content || mongoose.model("Content", contentSchema);
