const router = require('express').Router();
const playersController = require('../controllers/playersController');
const authController = require('../controllers/authController');

router.route('/').post(authController.protect, playersController.createPlayer);

module.exports = router;
