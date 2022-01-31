const asyncHandler = require('express-async-handler');
const Question = require('../models/questionModel.js');
const UserAnswer = require('../models/userAnswerModel.js');
const User = require('../models/userModel.js');

const createQuestion = asyncHandler(async (req, res) => {
  const {
    questionDept,
    questionCategory,
    questionText,
    options,
    correctAnswer,
    imageUrl,
  } = req.body;

  var userAnswer = null;

  const newQuestion = await Question.create({
    questionDept,
    questionCategory,
    questionText,
    correctAnswer,
    userAnswer,
    imageUrl,
    options,
    creator: {
      name: req.user.name,
      cdept: req.user.dept,
      cRegNo: req.user.regNo,
      userId: req.user._id,
    },
  });

  if (newQuestion) {
    res.json({
      questionText: newQuestion.questionText,
      questionDept: newQuestion.questionDept,
      options: newQuestion.options,
      creator: newQuestion.creator,
    });
  }
});

const updateQuestion = asyncHandler(async (req, res) => {
  const { correctAnswer, questionDept, questionText, options, imageUrl } =
    req.body;

  const questionFound = await Question.findById(req.params.id);

  if (questionFound) {
    (questionFound.correctAnswer = correctAnswer),
      (questionFound.questionDept = questionDept),
      (questionFound.questionText = questionText),
      (questionFound.options = options),
      (questionFound.imageUrl = imageUrl);

    const updatedQuestion = await questionFound.save();
    res.json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error('Question not found');
  }
});

const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.find({});

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
});

const getQuestionById = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error('Quesion not Found');
  }
});

const getQuestionByCreator = asyncHandler(async (req, res) => {
  const { regNo } = req.body;

  const question = await Question.find({ creator: { cRegNo: regNo } });

  if (question) {
    res.json(question);
  } else {
    res.status(404);
    throw new Error('Question not found');
  }
});

const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (question) {
    await question.remove();
    res.json({ message: 'question Removed' });
  } else {
    res.status(400);
    throw new Error('Question not found');
  }
});

const getQuestionByDept = asyncHandler(async (req, res) => {
  const { dept } = req.body;

  var regNo = req.user.regNo;

  const rndInt = (regNo % 3) + 1;

  let question = [];

  const coreQuestions = await Question.find({ questionDept: dept });
  var aptitudeQuestion = await Question.find({ questionCategory: 'Aptitude' });
  var verbalQuestion = await Question.find({ questionCategory: 'Verbal' });
  var codingQuestion = await Question.find({ questionCategory: 'Coding' });

  if (aptitudeQuestion.length >= 30) {
    if (rndInt === 1) {
      var aptitudeQuestion = aptitudeQuestion.slice(0, 10);
      var verbalQuestion = verbalQuestion.slice(0, 10);
      var codingQuestion = codingQuestion.slice(0, 10);
    } else if (rndInt === 2) {
      var aptitudeQuestion = aptitudeQuestion.slice(10, 20);
      var verbalQuestion = verbalQuestion.slice(10, 20);
      var codingQuestion = codingQuestion.slice(10, 20);
    } else if (rndInt === 3) {
      var aptitudeQuestion = aptitudeQuestion.slice(20, 30);
      var verbalQuestion = verbalQuestion.slice(20, 30);
      var codingQuestion = codingQuestion.slice(20, 30);
    }
  }

  question = aptitudeQuestion;
  question = question.concat(verbalQuestion);
  question = question.concat(codingQuestion);
  question = question.concat(coreQuestions);

  if (question) {
    res.json(question);
  } else {
    res.status(400);
    throw new Error('Questions not found');
  }
});

const submitAnswer = asyncHandler(async (req, res) => {
  const { answers } = req.body;

  var score = 0;
  var coreScore = 0;
  var aptitudeScore = 0;
  var verbalScore = 0;
  var codingScore = 0;

  answers.map((e) => {
    if (e.correctAnswer === e.userAnswer) {
      score = score + 1;
      if (e.questionCategory === 'Aptitude') {
        aptitudeScore = aptitudeScore + 1;
      } else if (e.questionCategory === 'Verbal') {
        verbalScore = verbalScore + 1;
      } else if (e.questionCategory === 'Coding') {
        codingScore = codingScore + 1;
      } else if (e.questionCategory === 'Core') {
        coreScore = coreScore + 1;
      }
    }
  });

  const newUserAnswer = await UserAnswer.create({
    name: req.user.name,
    regNo: req.user.regNo,
    dept: req.user.dept,
    userId: req.user._id,
    answers: answers,
    totalScore: score,
    aptitudeScore,
    verbalScore,
    codingScore,
    coreScore,
  });

  if (newUserAnswer) {
    res.json(newUserAnswer);
  } else {
    res.status(400);
    throw new Error('Error submitting answers');
  }
});

module.exports = {
  createQuestion,
  updateQuestion,
  getQuestion,
  getQuestionById,
  getQuestionByCreator,
  deleteQuestion,
  getQuestionByDept,
  submitAnswer,
};
