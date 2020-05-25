const Tournament = require('../models/tournamentModel');
const userController = require('./userController');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.createTournament = catchAsync(async (req, res) => {
  const tournamentDetails = {
    name: req.body.name,
    format: req.body.format,
    players: req.body.players,
  };

  const newTournament = await Tournament.create({ ...tournamentDetails });
  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { $push: { tournaments: newTournament._id } },
    { new: true }
  )
    .populate('tournaments')
    .populate('players');

  res.status(200).json({
    message: 'Success',
    user: updatedUser,
  });
});
