const router = require('express').Router();
const authController = require('../controllers/authController');
const matchController = require('../controllers/matchesController');

router.route('/').post(authController.protect, matchController.createMatch);

module.exports = router;
