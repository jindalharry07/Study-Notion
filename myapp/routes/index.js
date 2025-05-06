// routes/index.js
const express = require("express");
const router = express.Router();

// Welcome Page
router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/choose", (req, res) => {
  res.render("choose"); 
});


module.exports = router;
