'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailertransport = require('../lib/nodemailerServiceTransport');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true},  //unique true hace que no puedas meter duplicados (al hacer el indice) -- puedes poner index:true e index sin reparos
  email: { type: String, unique: true},
  password: String,
});

userSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
};

userSchema.methods.sendEmail = async function(from, subject, body) {

  await nodemailertransport.sendMail({
    from, // sender address
    to: this.email, // list of receivers
    subject, // Subject line
    html: body,
  });
};

const User = mongoose.model('User',userSchema);

module.exports = User;