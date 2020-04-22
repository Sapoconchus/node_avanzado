'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');

class LoginController {

  index(req, res, next) {
    res.locals.email = '';
    res.render('login');
    
  }

  async post (req, res, next){
    try {

      const email = req.body.email;
      const password = req.body.password;
  
      console.log(email, password);
  
      const user = await User.findOne({email})
  
      if (!user || !await bcrypt.compare(password, user.password)) {
        res.locals.email = email;
        res.locals.error = res.__('ivalid user');
        res.render('login');
        return;
      }
      
      res.redirect('/view');
      
      

    } catch(err) {
      next(err);
    }
  }
}

module.exports = new LoginController();