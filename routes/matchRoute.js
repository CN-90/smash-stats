const router = require('express').Router();
const authController = require('../controllers/authController');
const matchController = require('../controllers/matchController');

router.route('/').post(matchController.createMatch);



module.exports = router;
