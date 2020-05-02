const router = require('express').Router();
const playersController = require('../controllers/playersController');

router.route('/').post(playersController.createPlayer);
router.route('/:id/add-match').patch(playersController.addMatch);

module.exports = router;
