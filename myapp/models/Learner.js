const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

module.exports = mongoose.model("Learner", learnerSchema);
