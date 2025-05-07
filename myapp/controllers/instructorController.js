// controllers/instructorController.js
const Instructor = require("../models/Instructor");

exports.getSignup = (req, res) => {
  res.render("instructor/signup");
};

exports.getLogin = (req, res) => {
  res.render("instructor/login");
};

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const instructor = new Instructor({ name, email, password });
    await instructor.save();
    res.send("Instructor registered successfully! <a href='/instructor/login'>Login</a>");
  } catch (err) {
    res.send("Error during signup: " + err.message);
  }
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const instructor = await Instructor.findOne({ email, password });

    if (instructor) {
      req.session.instructor = instructor;
      
      return res.redirect("/instructor/dashboard");
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    res.send("Error during login: " + err.message);
  }
};
