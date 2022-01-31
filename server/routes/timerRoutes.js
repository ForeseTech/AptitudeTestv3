const express = require('express');
const router = express.Router();
const { createTimer, getTimer } = require('../controllers/timerController.js');

router.route('/').post(createTimer).get(getTimer);

module.exports = router;
