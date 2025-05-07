const express = require("express");
const router = express.Router();
const learnerController = require("../controllers/learnerController");

// Show the login/signup page
router.get("/", (req, res) => {
  res.redirect("/learner/login");  // Redirect to login page for learners
});

// Show signup form
router.get("/signup", learnerController.getSignup);

// Handle signup submission
router.post("/signup", learnerController.postSignup);

// Show login form
router.get("/login", learnerController.getLogin);

// Handle login submission
router.post("/login", learnerController.postLogin);

// Show learner's dashboard (after login)
router.get("/dashboard", learnerController.getDashboard);

// View specific content
router.get("/content/:contentId", learnerController.viewContent);

// ✅ Logout route
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.redirect("/learner/dashboard"); // fallback if session fails
    }
    res.redirect("/learner/login"); // redirect to learner login page
  });
});

module.exports = router;
