'use strict';

var express = require('express');
var router = express.Router();
const service = require('../../services/coteRequester');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async(req, res, next) => {
  try {
  
    const email = req.body.email;
    const password = req.body.password;
  
    console.log(email, password);
  
    const user = await User.findOne({email});
  
    if (!user || !await bcrypt.compare(password, user.password)) {
      const error = new Error('invalid credentials');
      error.status = 401;
      next(error);
      return;
    }
    const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET, {expiresIn: '2d'});

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
    
    res.json({success: true, newUser});

    service.sendMail(process.env.ADMIN_EMAIL, email, 'thank you for registering on our API', `Thank you for registering on anunciaLOL. You will be provided with an API token on login. Username: ${user.username} Password: ${password}.`);
  } catch(err) {
    next(err);
  }
});

module.exports = router;