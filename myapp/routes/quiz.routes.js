const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

// View all quizzes
router.get('/instructor/quizzes', quizController.getAllQuizzes);

// Create a new quiz
router.get('/instructor/quizzes/new', quizController.showCreateQuizForm);
router.post('/instructor/quizzes/new', quizController.createQuiz);

// View specific quiz (with questions)
router.get('/instructor/quizzes/:id', quizController.viewQuiz);

// Edit quiz
router.get('/instructor/quizzes/:id/edit', quizController.showEditQuizForm);
router.post('/instructor/quizzes/:id/edit', quizController.updateQuiz);

// Delete quiz
router.post('/instructor/quizzes/:id/delete', quizController.deleteQuiz);

// Add questions to quiz
router.get('/instructor/quizzes/:id/add-question', quizController.showAddQuestionForm);
router.post('/instructor/quizzes/:id/add-question', quizController.addQuestion);

module.exports = router;
