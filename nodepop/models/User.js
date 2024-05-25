const mongoose = require('mongoose');

// set user schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    index: true
  },
  password: String
})

// create user model and export
const User = mongoose.model('User', userSchema);

module.exports = User;