const mongoose = require('mongoose');

//import library to hash passwords
const bcrypt = require('bcrypt')

// set user schema
const userSchema = mongoose.Schema({
  email: {
    type: String,
    index: true
  },
  password: String
})

//create a hash for password
userSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

//verify password
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password)
}

// create user model and export
const User = mongoose.model('User', userSchema);

module.exports = User;