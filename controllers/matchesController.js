const Match = require('../models/matchModel');
const User = require('../models/userModel');
const Tournament = require('../models/tournamentModel');
const catchAsync = require('../utils/catchAsync');

module.exports.createMatch = catchAsync(async (req, res) => {
  const { playerOne, playerTwo, format } = req.body;
  const players = [playerOne.data._id, playerTwo.data._id];

  const newMatch = await Match.create({ players, format });
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { matches: newMatch._id } },
    { new: true }
  )
    .populate({ path: 'matches', populate: { path: 'players' } })
    .populate('players');

  res.status(200).json({
    message: 'Success',
    updatedUser,
  });
});

module.exports.createGame = catchAsync((req, res) => {});

// Create set which will have to players
// then allow ability to add

// const newTournament = await Tournament.create({ ...tournamentDetails });
//   const updatedUser = await User.findByIdAndUpdate(
//     { _id: req.user._id },
//     { $push: { tournaments: newTournament._id } },
//     { new: true }
//   )
//     .populate('tournaments')
//     .populate('players');

//   res.status(200).json({
//     message: 'Success',
//     user: updatedUser,
//   });
