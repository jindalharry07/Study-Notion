const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learner.controller');

// Show root -> redirect to login
router.get("/", (req, res) => {
  res.redirect("/learner/login");
});

// Show learner signup form
router.get("/signup", learnerController.getSignup);

// Handle learner signup form
router.post("/signup", learnerController.postSignup);

// Show learner login form
router.get("/login", learnerController.getLogin);

// Handle learner login form
router.post("/login", learnerController.postLogin);

// Show learner dashboard after login
router.get("/dashboard", learnerController.dashboard);

// View content uploaded by a specific instructor
router.get("/instructor/:instructorId/contents", learnerController.getInstructorContents);

// List all available quizzes
router.get("/quizzes", learnerController.quizList);

// Submit a quiz
router.post("/quiz/:quizId/submit", learnerController.submitQuiz);

// View result of a quiz
router.get("/quiz/:quizId/result", learnerController.viewResult);

// Handle learner logout
router.get("/logout", learnerController.logout);

module.exports = router;
