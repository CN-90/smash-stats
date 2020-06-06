const Tournament = require('../models/tournamentModel');
const userController = require('./userController');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getTournament = catchAsync(async (req, res, next) => {
  const tournament = await Tournament.findById({ _id: req.body.id });

  if (!tournament) {
    return next(new AppError('That tournament does not exist'));
  }

  res.status(200).json({
    message: 'Success',
    tournament,
  });
});

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
