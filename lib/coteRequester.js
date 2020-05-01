'use strict';

const cote = require('cote');

const caller = new cote.Requester({
  name: 'findUser'
});

const findUser = (email, password) => {
  console.log('requester', email);

  caller.send({
    type: 'find user',
    email,
    password,
  }, user => user);
  /*
  console.log('requester gets: ', user);
  return user;*/
};

module.exports = findUser;