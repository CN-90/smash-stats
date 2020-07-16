const router = require('express').Router();
const authController = require('../controllers/authController');
const tournamentController = require('../controllers/tournamentController');

router
  .route('/')
  .post(authController.protect, tournamentController.createTournament);

router.route('/:id').get(tournamentController.getTournament);
router.route('/:id/createMatch').post(tournamentController.createMatch);

module.exports = router;
