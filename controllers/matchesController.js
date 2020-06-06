const Match = require('../models/matchModel');
const Tournament = require('../models/tournamentModel');
const catchAsync = require('../utils/catchAsync');

module.exports.createMatch = catchAsync((req, res) => {
  let tournament = Tournament.findById({ _id: req.body.tournamentId });
});

// Create set which will have to players
// then allow ability to add
