const Content = require('../models/Content');
const PDF = require('../models/Pdf');
const Quiz = require('../models/quiz.model');
const Attempt = require('../models/attempt');
const User = require('../models/Learner');
const Instructor = require('../models/Instructor');

// GET: Signup page
exports.getSignup = (req, res) => {
  res.render('learner/signup', { success: req.query.success });
};

// POST: Signup logic
exports.postSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("All fields required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("Email already exists");

    await User.create({ name, email, password });
    res.redirect('/learner/signup?success=true'); // Redirect to signup with success message
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).send("Something went wrong during signup");
  }
};

// GET: Login page
exports.getLogin = (req, res) => {
  res.render('learner/login');
};

// POST: Login logic
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const learner = await User.findOne({ email });

  // Validate user credentials
  if (!learner || learner.password !== password) {
    return res.status(400).send("Invalid credentials");
  }

  // Set session and redirect to learner dashboard
  req.session.user = learner;
  res.redirect('/learner/dashboard');
};

// Middleware to check if user is logged in for protected routes
const ensureLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/learner/login');
  }
  req.user = req.session.user;
  next();
};

// GET: Learner dashboard - show all instructors
exports.dashboard = [
  ensureLoggedIn,
  async (req, res) => {
    try {
      const instructors = await Instructor.find({}, 'name _id');

      res.render('learner/learner-dashboard', {
        learner: req.user,
        instructors
      });
    } catch (err) {
      console.error("Dashboard error:", err);
      res.status(500).send("Something went wrong.");
    }
  }
];

// View content uploaded by a specific instructor (including quizzes)
exports.getInstructorContents = [
  ensureLoggedIn,
  async (req, res) => {
    try {
      const instructorId = req.params.instructorId;

      const [resources, pdfs, quizzes, instructor] = await Promise.all([
        Content.find({ instructorId }),
        PDF.find({ instructorId }),
        Quiz.find({ createdBy: instructorId }),
        Instructor.findById(instructorId)
      ]);

      // Normalize file paths for PDFs
      pdfs.forEach(p => {
        p.filePath = p.filePath.replace(/\\/g, "/");
      });

      if (!instructor) return res.status(404).send("Instructor not found.");

      res.render('learner/instructor-content', {
        instructor,
        resources,
        pdfs,
        quizzes
      });

    } catch (err) {
      console.error("Error fetching instructor contents:", err);
      res.status(500).send("Failed to load contents.");
    }
  }
];

// GET: Show all quizzes
exports.quizList = [
  ensureLoggedIn,
  async (req, res) => {
    try {
      const quizzes = await Quiz.find();
      res.render('learner/quizzes', { quizzes });
    } catch (err) {
      console.error("Quiz list error:", err);
      res.status(500).send("Could not load quizzes.");
    }
  }
];


// NEW: GET: Show a single quiz with its questions (when Take Quiz clicked)
exports.showQuiz = [
  ensureLoggedIn,
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.quizId).populate('questions');
      if (!quiz) return res.status(404).send("Quiz not found.");

      res.render('learner/quiz-details', { quiz });
    } catch (err) {
      console.error("Show quiz error:", err);
      res.status(500).send("Failed to load quiz.");
    }
  }
];


// POST: Submit quiz and calculate score
exports.submitQuiz = [
  ensureLoggedIn,
  async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.quizId).populate('questions');
      if (!quiz) return res.status(404).send("Quiz not found");

      let score = 0;

      quiz.questions.forEach((question, index) => {
        const userAnswerIndex = parseInt(req.body[`q${index}`]);
        if (
          !isNaN(userAnswerIndex) &&
          userAnswerIndex === question.correctAnswerIndex
        ) {
          score++;
        }
      });


      await Attempt.create({
        learner: req.user._id,
        quiz: quiz._id,
        score
      });

      res.redirect(`/learner/quiz/${quiz._id}/result`);
    } catch (err) {
      console.error("Submit quiz error:", err);
      res.status(500).send("Failed to submit quiz.");
    }
  }
];




// GET: View quiz result
exports.viewResult = [
  ensureLoggedIn,
  async (req, res) => {
    try {
      const result = await Attempt.findOne({
        learner: req.user._id,
        quiz: req.params.quizId
      });

      if (!result) return res.status(404).send("Result not found");

      res.render('learner/result', { result });
    } catch (err) {
      console.error("View result error:", err);
      res.status(500).send("Could not fetch result.");
    }
  }
];

// Logout functionality
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).send("Logout failed");
    }
    res.redirect('/learner/login');
  });
};
