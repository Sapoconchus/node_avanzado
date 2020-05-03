'use strict';

const cote = require('cote');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

const responder = new cote.Responder({name: 'user mgmt'});

responder.on('find user', async (req) => {
  try {
    const email = req.email;
    const password = req.password;
  
    console.log('responder mail: ', email);
    const user = await User.findOne({email});
    console.log('responder: ', user);
  
    if (!user || !await bcrypt.compare(password, user.password)) {
      console.log('invalid password');
      const error = new Error('invalid user or password');
      error.status = 401
      return error;
    }
    // (!user || !await bcrypt.compare(password, user.password)) ? send(false) : send(user);
    return user;
    // resp(user);

  } catch(err) {
    return err;
  }

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