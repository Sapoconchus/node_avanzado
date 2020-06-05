'use strict';

var express = require('express');
var router = express.Router();
const service = require('../../services/coteRequester');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const msg = require('../../lib/mail_templates');

router.post('/login', async(req, res, next) => {
  try {
    console.log(req.body)
  
    const email = req.body.email;
    const password = req.body.password;
  
    console.log('login recieved: ', email, password);
  
    const user = await User.findOne({email});
  
    if (!user || !await bcrypt.compare(password, user.password)) {
      const error = new Error('invalid credentials');
      error.status = 401;
      next(error);
      return;
    }
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '2d'});
    console.log("server response: ", {success: true, token})
    res.set('Access-Control-Allow-Origin', '*');
    res.json({success: true, token});
  
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

    res.set('Access-Control-Allow-Origin', '*');
    res.json({success: true, newUser});

    service.sendMail(process.env.ADMIN_EMAIL, email, msg.register.subject, msg.register.body);
  } catch(err) {
    next(err);
  }
});

module.exports = router;