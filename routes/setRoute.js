const router = require('express').Router();
const authController = require('../controllers/authController');
const setController = require('../controllers/setController');

router.route('/').post(authController.protect, setController.createSet);


module.exports = router;
