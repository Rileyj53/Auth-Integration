const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default: null  // Allow password to be null
  },
  displayName: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    default: null,
    sparse: true
  },
  image: {
    type: String,
    default: null
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
