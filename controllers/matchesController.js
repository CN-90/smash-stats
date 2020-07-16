const Match = require('../models/matchModel');
const Tournament = require('../models/tournamentModel');
const catchAsync = require('../utils/catchAsync');

module.exports.createMatch = catchAsync(async (req, res) => {
  const { players, format } = req.body;
  const match = Match.create({ players, format });

  // res.status(200).json({
  //   data: {
  //     players,
  //     format,
  //   },
  // });
  // const match = Match.create({});

  // let tournament = Tournament.findById({ _id: req.body.tournamentId });
});

module.exports.createGame = catchAsync((req, res) => {});

// Create set which will have to players
// then allow ability to add
