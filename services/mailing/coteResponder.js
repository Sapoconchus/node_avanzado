'use strict';

const cote = require('cote');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const fs = require('fs');
const jimp = require('jimp');

const responder = new cote.Responder({
  name: 'mail deliverer',
  key: 'mail service'
});

responder.on('send email', async (req) => {
  const from = req.from;
  const subject = req.subject;
  const body = req.body;
  const email = req.to;

  const user = await User.findOne({email});

  return user.sendEmail(from, subject, body);

});

module.exports = responder;