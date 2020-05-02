'use strict';

const cote = require('cote');

const caller = new cote.Requester({
  name: 'findUser'
});

const findUser = async(email, password) => {
  
  console.log('requester: ', email);
  

  return await caller.send({
    type: 'find user',
    email,
    password,
  });

};

module.exports = findUser;