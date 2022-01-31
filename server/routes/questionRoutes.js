const express = require('express');
const {
  createQuestion,
  getQuestion,
  getQuestionById,
  getQuestionByCreator,
  deleteQuestion,
  updateQuestion,
  getQuestionByDept,
  submitAnswer,
} = require('../controllers/questionController.js');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').get(getQuestion);
router.route('/create').post(protect, createQuestion);
router
  .route('/:id')
  .get(getQuestionById)
  .delete(deleteQuestion)
  .put(updateQuestion);
router.route('/creator/:id').post(getQuestionByCreator);
router.route('/test').post(protect, getQuestionByDept);
router.route('/submit').post(protect, submitAnswer);

module.exports = router;
