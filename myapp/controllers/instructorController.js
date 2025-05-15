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
// POST: Instructor signup logic
exports.postSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send("All fields required");
    }

    const existingInstructor = await Instructor.findOne({ email });
    if (existingInstructor) return res.status(400).send("Email already exists");

    await Instructor.create({ name, email, password });
    res.redirect('/instructor/signup?success=true'); // Redirect to signup page with success message
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send("Something went wrong during signup");
  }
};


/// controllers/instructorController.js
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const instructor = await Instructor.findOne({ email, password });

    if (instructor) {
      // Set the instructor session after successful login
      req.session.instructor = instructor;             // For full object (used in dashboard, etc.)
      req.session.instructorId = instructor._id;        // For quick ID use (used in PDFs, quizzes)

      // Redirect to the instructor's dashboard
      return res.redirect("/instructor/dashboard");
    } else {
      res.send("Invalid credentials");
    }
  } catch (err) {
    res.send("Error during login: " + err.message);
  }
};

