'use strict';

require('dotenv').config();

const cote = require('cote');
require('./connectMongoose');
const User = require('../models/User');

const responder = new cote.Responder({name: 'user mgmt'});

// cote admite devolver promesas, por tanto no te hace falta la función done
responder.on('find user', async(req) => {
  const email = req.email;
  const password = req.password;

  console.log('responder: ', email);
  const user = await User.findOne({email});
  console.log('responder: ', user);
 // (!user || !await bcrypt.compare(password, user.password)) ? send(false) : send(user);
  return user; // cote admite devolver promesas, por tanto no te hace falta la función done
 // resp(user);
});

module.exports = responder;