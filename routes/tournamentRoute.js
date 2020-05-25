const router = require('express').Router();
const authController = require('../controllers/authController');
const tournamentController = require('../controllers/tournamentController');

router
  .route('/')
  .post(authController.protect, tournamentController.createTournament);

module.exports = router;
