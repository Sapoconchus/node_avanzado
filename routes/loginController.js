'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const caller = require('../services/coteRequester');
const jwt = require('jsonwebtoken');

class LoginController {

  index(req, res, next) {
    res.locals.email = '';
    res.render('login');
    
  }

  async post (req, res, next){
    try {

      const email = req.body.email;
      const password = req.body.password;
 
      const user = await caller.findUser(email, password); //await User.findOne({email});

      console.log('logincontroller user: ', user);

      req.session.authUser = user._id;

      res.redirect('/privado');
      
      //mando mail por probar el servicio

      user.sendEmail(process.env.ADMIN_EMAIL, 'new login', 
        'We are glad to seeing you again on our API. Cheers!');
    } catch(err) {
      next(err);
    }
  }

  logout(req, res, next){
    req.session.regenerate(err => {
      if(err) {
        next(err);
        return;
      }
      res.redirect('/');
    });
  }
}

module.exports = new LoginController();
