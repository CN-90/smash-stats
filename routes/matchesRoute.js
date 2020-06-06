const router = require('express').Router();
const authController = require('../controllers/authController');
const matchController = require('../controllers/matchesController');

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello from matches.',
  });
});

router.route('/').post(authController.protect, matchController.createMatch);

module.exports = router;
