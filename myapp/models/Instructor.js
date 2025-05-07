const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

module.exports = mongoose.models.Instructor || mongoose.model("Instructor", instructorSchema);
