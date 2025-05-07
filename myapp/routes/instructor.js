const express = require("express");
const router = express.Router();

const instructorController = require("../controllers/instructorController");
const contentController = require("../controllers/contentController");

// ✅ Move console logs below require statements
console.log("InstructorController:", instructorController);
console.log("ContentController:", contentController);

// Redirect to login if no route is matched
router.get("/", (req, res) => res.redirect("/instructor/login"));

// Signup routes
router.get("/signup", instructorController.getSignup);
router.post("/signup", instructorController.postSignup);

// Dashboard route (Instructor Dashboard)
router.get("/dashboard", contentController.getDashboard);

// Edit content
router.get("/edit/:id", contentController.getEditContent);
router.post("/edit/:id", contentController.postEditContent);

// Delete content
router.post("/delete/:id", contentController.deleteContent);

// Add Question route
router.get("/add-question", contentController.getAddQuestion);
router.post("/add-question", contentController.postAddQuestion);

// Login routes
router.get("/login", instructorController.getLogin);
router.post("/login", instructorController.postLogin);

// Logout route (Instructor Logout)
router.get("/logout", (req, res) => {
  // Perform logout operation (clear session or token)
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    // Redirect to instructor login page
    res.redirect("/instructor/login");
  });
});

module.exports = router;
