const mongoose = require('mongoose');

const userFeedbackSchema = mongoose.Schema({
  review: {
    type: String,
  },
  experienceRating: {
    type: String,
    required: true,
  },
  difficultyRating: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  },
});

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema);

module.exports = UserFeedback;
