const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const usersSchema = new Schema({
  name: {
    type: String,
    maxlength: [15, 'Name must be between 1 and 15 characters.'],
    minlength: [4, 'Name must be between 1 and 15 characters.'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email.'],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be 8 characters or more.'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords do not match.',
    },
  },
  players: [{ type: mongoose.Schema.ObjectId, ref: 'Player' }],
  matches: [{ type: mongoose.Schema.ObjectId, ref: 'Match' }],
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

// encrypt password
usersSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

// check if passwords match
usersSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

usersSchema.methods.addTournament = async function (userID, tournamentID) {
  let updatedUser = await User.findByIdAndUpdate(
    { _id: userID },
    { $push: { tournaments: tournamentID } },
    { new: true }
  );

  return updatedUser;
};

// create reset password token
usersSchema.methods.createPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model('User', usersSchema);

module.exports = User;
