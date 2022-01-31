const express = require('express');
const {
  registerAdmin,
  authAdmin,
  getAnswers,
} = require('../controllers/adminController.js');
const router = express.Router();

router.route('/').post(registerAdmin);
router.route('/login').post(authAdmin);
router.route('/answers').get(getAnswers);

module.exports = router;
