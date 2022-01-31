const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel.js');
const UserAnswer = require('../models/userAnswerModel.js');
const generateToken = require('../utils/generateToken.js');

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await Admin.findOne({ email });

  if (userExists) {
    res.status(403);
    throw new Error('User Already Exists');
  }

  const user = await Admin.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await Admin.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or Password');
  }
});

const getAnswers = asyncHandler(async (req, res) => {
  const answers = await UserAnswer.find({});

  if (answers) {
    res.json(answers);
  } else {
    res.status(404);
    throw new Error('Data not found');
  }
});

module.exports = { registerAdmin, authAdmin, getAnswers };
