const Learner = require("../models/Learner");
const Content = require("../models/Content");

exports.getSignup = (req, res) => {
  res.render("learner/signup");
};

exports.postSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const learner = new Learner({ name, email, password });
    await learner.save();
    res.send("Learner registered successfully! <a href='/learner/login'>Login</a>");
  } catch (err) {
    res.send("Signup error: " + err.message);
  }
};

exports.getLogin = (req, res) => {
  res.render("learner/login");
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const learner = await Learner.findOne({ email, password });
    if (learner) {
      req.session.learner = learner;  
      res.redirect("/learner/dashboard"); 
    } else {
      res.send("Invalid credentials, please try again.");
    }
  } catch (err) {
    res.send("Login error: " + err.message);
  }
};
exports.getDashboard = async (req, res) => {
  try {
    const learner = req.session.learner;
    if (!learner) {
      return res.redirect("/learner/login");
    }

    const contents = await Content.find().populate("instructorId", "name");
    res.render("learner/dashboard", { learner, contents });
  } catch (err) {
    res.send("Dashboard error: " + err.message);
  }
};

exports.viewContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.contentId).populate("instructorId", "name");
    if (!content) {
      return res.send("Content not found.");
    }

    res.render("learner/viewContent", { content });
  } catch (err) {
    res.send("Error fetching content: " + err.message);
  }
};
