'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true},
  email: { type: String, unique: true},
  password: String,
});

userSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
};

const User = mongoose.model('User',userSchema);

module.exports = User;