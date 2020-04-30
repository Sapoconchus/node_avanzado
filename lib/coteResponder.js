'use strict'

const cote = require('cote');
const User = require('../models/User');

const responder = new cote.Responder({name: 'user mgmt'});

responder.on('find user', async(req, send) => {

  const email = req.email;
  const password = req.password;

  console.log('responder', email);

  const user = await User.findOne({email});
  console.log('responder', user);
  
 // (!user || !await bcrypt.compare(password, user.password)) ? send(false) : send(user);

 console.log('stringy en responder: ', JSON.stringify(user)); 
 send(JSON.stringify(user));



});

module.exports = responder;