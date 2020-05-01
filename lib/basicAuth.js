'use strict';

const auth = require('basic-auth'); //esta libreria básicamente recoge la cabecera de una petición. Y ya

module.exports = function() {
  return (req, res, next) => {
    const user = auth(req);
    if(!user || user.name !== 'admin' || user.pass !== '1234') {
      //set a header on the response
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      res.sendStatus(401);
      return;
    }
    next();
  };
};