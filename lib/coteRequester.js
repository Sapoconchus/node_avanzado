'use strict';

const cote = require('cote');

const findUser = async(email, password) => {
  
  console.log('requester: ', email);
  
  const caller = new cote.Requester({
    name: 'findUser'
  });
 await caller.send({
    type: 'find user',
    email,
    password,
  }, resp => JSON.parse(resp));

  /*
  console.log('requester gets: ', user);
  return user;*/
};

module.exports = findUser;