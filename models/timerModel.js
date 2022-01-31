const mongoose = require('mongoose');

const timerSchema = mongoose.Schema({
  endTime: {
    type: String,
  },
  start: {
    type: Boolean,
  },
  testCompleted: {
    type: Boolean,
  },
});

const Timer = mongoose.model('Timer', timerSchema);
module.exports = Timer;
