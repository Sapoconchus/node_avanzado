'use strict';

require('dotenv').config();

const cote = require('cote');
const User = require('../../models/User');
const mongoose = require('../../lib/connectMongoose');
const nodemailer = require('../../lib/nodemailerServiceTransport');

const responder = new cote.Responder({
  name: 'mail deliverer',
  key: 'mail service'
});

responder.on('send email', async (req) => {
  try {
    const from = req.from;
    const subject = req.subject;
    const body = req.body;
    const email = req.to;
  
    console.log('emailer recieved: ', from, subject, body, email);

    const user = await User.findOne({email});
  
    console.log('user on responder retrieved: ', user);

    await user.sendEmail(from, subject, body);

  } catch(err) {
    return err;
  }
});

module.exports = responder;