'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailertransport = require('../lib/nodemailerServiceTransport');
const cote = require('cote');


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
/*
userSchema.methods.findUser = async function() {

  const responder = new cote.Responder({name: 'user mgmt'});

  responder.on('find user', async(req, send) => {
  
    const email = req.email;
    const password = req.password;
  
    console.log('responder', email);
  
    const user = await User.findOne({email});
    console.log('responder', user);
    
   // (!user || !await bcrypt.compare(password, user.password)) ? send(false) : send(user);
  
   send(user);
  
  });
}*/

const User = mongoose.model('User',userSchema);

module.exports = User;