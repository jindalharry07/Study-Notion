const Quiz = require('../models/quiz.model');
const Question = require('../models/question.model');

// View all quizzes
exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ createdBy: req.session.instructorId }).populate('questions');
    res.render('instructor/quizzes', { quizzes });
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).send("Server Error");
  }
};

// Render create quiz form
exports.showCreateQuizForm = (req, res) => {
  res.render('instructor/create-quiz');
};

// Handle quiz creation
exports.createQuiz = async (req, res) => {
  try {
    const { title, description } = req.body;
    const quiz = new Quiz({ title, description, createdBy: req.session.instructorId });
    await quiz.save();
    res.redirect(`/instructor/quizzes/${quiz._id}/add-question`);
  } catch (err) {
    console.error("Error creating quiz:", err);
    res.status(500).send("Failed to create quiz");
  }
};

// View a single quiz (with questions)
exports.viewQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('questions');
    if (!quiz) return res.status(404).send("Quiz not found");
    res.render('instructor/viewQuiz', { quiz });
  } catch (err) {
    console.error("Error viewing quiz:", err);
    res.status(500).send("Server Error");
  }
};

// Render edit quiz form
exports.showEditQuizForm = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).send("Quiz not found");
    res.render('instructor/edit-quiz', { quiz });
  } catch (err) {
    console.error("Error loading edit form:", err);
    res.status(500).send("Server Error");
  }
};

// Handle quiz update
exports.updateQuiz = async (req, res) => {
  try {
    const { title, description } = req.body;
    await Quiz.findByIdAndUpdate(req.params.id, { title, description });
    res.redirect('/instructor/quizzes');
  } catch (err) {
    console.error("Error updating quiz:", err);
    res.status(500).send("Failed to update quiz");
  }
};

// Delete quiz (and its questions)
exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).send("Quiz not found");

    // Delete all related questions first
    await Question.deleteMany({ quiz: quiz._id });

    // Then delete the quiz
    await Quiz.findByIdAndDelete(req.params.id);

    res.redirect('/instructor/quizzes');
  } catch (err) {
    console.error("Error deleting quiz:", err);
    res.status(500).send("Failed to delete quiz");
  }
};

// Show add question form
exports.showAddQuestionForm = (req, res) => {
  const quizId = req.params.id;
  res.render('instructor/add-question', { quizId });
};

// Handle question addition
exports.addQuestion = async (req, res) => {
  try {
    const { questionText, option1, option2, option3, option4, correctAnswerIndex } = req.body;
    const quizId = req.params.id;

    const question = new Question({
      questionText,
      options: [option1, option2, option3, option4],
      correctAnswerIndex,
      quiz: quizId
    });

    await question.save();
    await Quiz.findByIdAndUpdate(quizId, { $push: { questions: question._id } });

    res.redirect(`/instructor/quizzes/${quizId}/add-question`);
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).send("Failed to add question");
  }
};
