'use strict'

const cote = require('cote');

const caller = new cote.Requester({
    name: 'findUser'
  });

const findUser = async (email, password) => {

    console.log('requester', email)

    const user = await caller.send({
        type: 'find user',
        email,
        password,
      });
console.log(user);
return user;
}

module.exports = findUser;