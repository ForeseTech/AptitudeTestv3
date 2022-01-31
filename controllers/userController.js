const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');
const UserAnswer = require('../models/userAnswerModel.js');
const generateToken = require('../utils/generateToken.js');
const UserFeedback = require('../models/userFeedback.js');

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, regNo, dept, isVolunteer } = req.body;

    email ? email : null;

    const exists = await User.findOne({ $and: [{ regNo }, { isVolunteer }] });

    if (exists) {
      res.json({
        _id: exists._id,
        name: exists.name,
        regNo: exists.regNo,
        email: exists.email,
        dept: exists.dept,
        isVolunteer: exists.isVolunteer,
        token: generateToken(exists._id),
      });
    } else {
      const user = await User.create({
        name,
        email,
        regNo,
        dept,
        isVolunteer,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          name: user.name,
          regNo: user.regNo,
          email: user.email,
          dept: user.dept,
          isVolunteer: user.isVolunteer,
          token: generateToken(user._id),
        });
      } else {
        res.status(400);
        throw new Error('Invalid user data');
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const userAnswered = asyncHandler(async (req, res) => {
  const userAnswered = await UserAnswer.findOne({ regNo: req.user.regNo });

  if (userAnswered) {
    const userFeedback = await UserFeedback.findOne({ regNo: req.user.regNo });

    if (userFeedback) {
      res.json({
        feedback: true,
        testAnswered: true,
      });
    } else {
      res.json({
        feedback: false,
        testAnswered: true,
      });
    }
  } else {
    res.json({
      feedback: false,
      testAnswered: false,
    });
  }
});

const createFeedback = asyncHandler(async (req, res) => {
  try {
    const { review, rating, difficulty } = req.body;
    const feedback = await UserFeedback.create({
      review: review,
      regNo: req.user.regNo,
      experienceRating: rating,
      difficultyRating: difficulty,
    });

    if (feedback) {
      res.status(201).json({
        review: feedback.review,
        regNo: feedback.regNo,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getAnswerKey = asyncHandler(async (req, res) => {
  try {
    const answerkey = await UserAnswer.findOne({ regNo: req.user.regNo });

    if (answerkey) {
      res.json(answerkey);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = { registerUser, userAnswered, createFeedback, getAnswerKey };
