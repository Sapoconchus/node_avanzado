'use strict';

var express = require('express');
var router = express.Router();
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
    const password = req.body.password;
    const user = new User({username, password});
    const newUser = await user.save();


    res.json({success: true, newUser});
  } catch(err) {
    next(err);
  }
});

module.exports = router;