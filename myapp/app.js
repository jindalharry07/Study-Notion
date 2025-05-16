const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;  // Import LocalStrategy

const app = express();
const port = 3000;

// Routes
const indexRoutes = require("./routes/index");
const instructorRoutes = require("./routes/instructor");
const pdfRoutes = require("./routes/pdfRoutes"); 
const quizRoutes = require('./routes/quiz.routes');
const learnerRoutes = require('./routes/learner.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // for CSS
app.set("view engine", "ejs");
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // ⬅️ Add this line

// Session Middleware (for instructors and learners)
app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Set req.user from session for every request
app.use((req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
  }
  next();
});


// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Use Routes
app.use("/", indexRoutes);
app.use("/instructor", instructorRoutes);
app.use("/instructor/pdfs", pdfRoutes); // ⬅️ Add this line
app.use(quizRoutes);
app.use('/learner', learnerRoutes);

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/studyNotion", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
     mongoose.set("strictPopulate", false);
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Passport.js User Serialization and Deserialization
passport.serializeUser((user, done) => {
  done(null, user.id);  // Store user id in session
});

passport.deserializeUser((id, done) => {
  // Retrieve the user from database using the id
  // For simplicity, assume you have a User model, replace with your actual model
  const User = require("./models/User"); // Modify according to your User model path
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Passport Local Strategy
passport.use(new LocalStrategy((username, password, done) => {
  const User = require("./models/User");  // Adjust according to your model
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: "Incorrect username." });
    if (user.password !== password)  // Use hashed password in a real app
      return done(null, false, { message: "Incorrect password." });
    
    return done(null, user);
  });
}));

// Logout Route for Passport
app.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.redirect("/instructor/login"); // Redirect after logout
  });
});

// Start server
app.listen(port, () => {
  console.log(`StudyNotion running at http://localhost:${port}`);
});
