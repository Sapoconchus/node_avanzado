'use strict';

var express = require('express');
var router = express.Router();
const service = require('../../services/coteRequester');
const User = require('../../models/User');

router.post('/login', async(req, res, next) => {
  try {

    const username = req.body.username;
    const password = req.body.password;
    const rememberMe = req.body.remember;

    const validated = await User.find({username, password});

    if (validated[0] === undefined) {
      const err = new Error('user not found or password incorrect');
      err.status = 404;
      return next(err);
    }

    if (rememberMe) {
      res.cookie('user', validated[0]._id, { expires: new Date(Date.now() + 900000)});
    } else {
      res.cookie('user', validated[0]._id);
    }

    res.json({success: true, user:validated[0]});

  } catch(err) {
    next(err);
  }
});

router.post('/register', async(req, res, next) => {
  try {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const user = new User({username, email, password: await User.hashPassword(password)});
    const newUser = await user.save();
    
    res.json({success: true, newUser});

    service.sendMail(process.env.ADMIN_EMAIL, email, 'thank you for registering on our API', `Thank you for registering on anunciaLOL. You will be provided with an API token on login. Username: ${user.username} Password: ${password}.`);
  } catch(err) {
    next(err);
  }
});

module.exports = router;