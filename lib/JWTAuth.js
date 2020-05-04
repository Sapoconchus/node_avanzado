'use strict';

//JWT checker middlewarwe

const jwt = require('jsonwebtoken');

module.exports = function() {
  return (req, res, next) => {
    //gets the request token
    const token = req.get('token') || req.query.token || req.body.token; //you choose the header name
    console.log(token);
        
    // no token, no party
    if(!token) {
      const error = new Error('Api Key not provided');
      error.status= 401;
      next(error);
      return;
    }

    // check token validity
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        const error = new Error('token invalid');
        error.status= 401;
        next(error);
        return;
      }
      req.apiAuthUserId = payload._id; // pass the user id into the req propertie in case any other middleware needs it further on the api.
      req.apiAuthUserEmail = payload.email;
      next();
    });

  };

};