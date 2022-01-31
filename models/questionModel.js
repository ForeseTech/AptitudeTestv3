const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  questionDept: {
    type: String,
    required: true,
  },
  questionCategory: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  options: [
    {
      optionText: {
        text: {
          type: String,
          required: true,
        },
      },
      uid: {
        type: String,
      },
    },
  ],
  userAnswer: {
    type: String,
  },
  correctAnswer: {
    type: String,
  },
  creator: {
    name: {
      type: String,
      required: true,
    },
    cdept: {
      type: String,
      required: true,
    },
    cRegNo: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
