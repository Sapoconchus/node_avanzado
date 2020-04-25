'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const userSchema = mongoose.Schema({
  username: { type: String, unique: true},
  email: { type: String, unique: true},
  password: String,
});

userSchema.statics.hashPassword = function(plainPassword) {
  return bcrypt.hash(plainPassword, 10);
};

userSchema.methods.sendEmail = async function(from, subject, body) {

  let testAccount = await nodemailer.createTestAccount();

  const transport = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_SERVICE_USER, 
      pass: process.env.EMAIL_SERVICE_PASS
    }
  });

 await transport.sendMail({
    from, // sender address
    to: this.email, // list of receivers
    subject, // Subject line
    html: body,
  });
}

const User = mongoose.model('User',userSchema);

module.exports = User;