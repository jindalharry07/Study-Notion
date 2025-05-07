const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const path = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;  

const app = express();
const port = 3000;

const indexRoutes = require("./routes/index");
const instructorRoutes = require("./routes/instructor");
const learnerRoutes = require("./routes/learner");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRoutes);
app.use("/instructor", instructorRoutes);
app.use("/learner", learnerRoutes); 

mongoose.connect("mongodb://127.0.0.1:27017/studyNotion", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

passport.serializeUser((user, done) => {
  done(null, user.id); 
});

passport.deserializeUser((id, done) => {
  const User = require("./models/User");
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy((username, password, done) => {
  const User = require("./models/User"); 
  User.findOne({ username: username }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false, { message: "Incorrect username." });
    if (user.password !== password) 
      return done(null, false, { message: "Incorrect password." });
    
    return done(null, user);
  });
}));

app.get("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.redirect("/instructor/login"); 
  });
});

app.listen(port, () => {
  console.log(`🚀StudyNotion running at http://localhost:${port}`);
});
