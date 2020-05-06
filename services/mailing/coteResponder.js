'use strict';

require('dotenv').config();

const cote = require('cote');
const User = require('../../models/User');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

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
  
    const transport = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_SERVICE_USER, 
        pass: process.env.EMAIL_SERVICE_PASS
      }
    });
    
    await transport.sendMail({
      from, // sender address
      to: email, // list of receivers
      subject, // Subject line
      html: body,
    });
    return;
    /*
    const user = await User.findOne({email});
  
    console.log('user on responder retrieved: ', user);
  
  
    return user.sendEmail(from, subject, body);
*/
  } catch(err) {
    return err;
  }
});

module.exports = responder;