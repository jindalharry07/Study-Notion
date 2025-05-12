// controllers/instructorController.js
const Instructor = require("../models/Instructor");

// Show signup form
exports.getSignup = (req, res) => {
  res.render("instructor/signup");
};

// Show login form
exports.getLogin = (req, res) => {
  res.render("instructor/login");
};

// Handle signup form submission
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

// Handle login form submission
// controllers/instructorController.js
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const instructor = await Instructor.findOne({ email, password });

    if (instructor) {
      // Set the instructor session after successful login
      req.session.instructor = instructor;
      
      // Redirect to the instructor's dashboard
      return res.redirect("/instructor/dashboard");
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    res.send("Error during login: " + err.message);
  }
};
