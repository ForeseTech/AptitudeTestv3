const asyncHandler = require('express-async-handler');
const Timer = require('../models/timerModel.js');

const createTimer = asyncHandler(async (req, res) => {
  const { endTime, start, testCompleted } = req.body;

  try {
    const oldTimer = await Timer.find({});

    if (oldTimer) {
      await Timer.deleteMany({});
    }

    const newTimer = await Timer.create({
      endTime,
      start,
      testCompleted,
    });

    if (newTimer) {
      res.json(newTimer);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const getTimer = asyncHandler(async (req, res) => {
  try {
    const timer = await Timer.find({});
    res.json(timer);
  } catch (error) {
    throw new Error('Timer not found');
  }
});
module.exports = { createTimer, getTimer };
