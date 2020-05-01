'use strict';

const cote = require('cote');
const caller = new cote.Requester({ name: 'findUser' });

// pasamos el send a promesas:
const send = config => new Promise(resolve => caller.send(config, resolve));

const findUser = async(email, password) => {

  console.log('requester: ', email);

  // devolvemos el resultado
  return await send({
    type: 'find user',
    email,
    password,
  });

  /*
  console.log('requester gets: ', user);
  return user;*/
};

module.exports = findUser;