const express = require('express');
const {
  createFeedback,
  registerUser,
  userAnswered,
  getAnswerKey,
} = require('../controllers/userController.js');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');

router.route('/').post(registerUser);
router.route('/usercheck').get(protect, userAnswered);
router.route('/feedback').post(protect, createFeedback);
router.route('/answerkey').get(protect, getAnswerKey);

module.exports = router;
