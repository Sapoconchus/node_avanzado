'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
const getUser = require('../lib/coteRequester')

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
 
      const response = await getUser(email, password); //await User.findOne({email});
      const user = JSON.parse(response);
      console.log('login controller: ', user)

      if (!user || !await bcrypt.compare(password, user.password)) {
        res.locals.email = email;
        res.locals.error = res.__('ivalid user');
        res.render('login');
        return;
      }

      req.session.authUser = user._id;

      res.redirect('/privado');
      
      //mando mail por probar el servicio

      await user.sendEmail(process.env.ADMIN_EMAIL, 'new login', 
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