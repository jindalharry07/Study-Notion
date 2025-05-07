// routes/index.js
const express = require("express");
const router = express.Router();

// Welcome Page
router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/choose", (req, res) => {
  res.render("choose"); // create this view next
});


// // Redirects to instructor and learner (to be built)
// router.get("/instructor", (req, res) => {
//   res.send("Instructor login/signup page (Coming Soon)");
// });

// router.get("/learner", (req, res) => {
//   res.send("Learner login/signup page (Coming Soon)");
// });

module.exports = router;
