'use strict';

const User = require('../models/User');
const bcrypt = require('bcrypt');
<<<<<<< HEAD
const getUser = require('../lib/coteRequester')
=======
const getUSer = require('../lib/coteRequester');
const jwt = require('jsonwebtoken');
>>>>>>> bd7bd1c35fec35906c05a574b9e34cc81117ea25

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

      const user = await caller.send({
        type: 'find user',
        email,
        password
      });
      /*
      const user = await getUSer(email, password); //await User.findOne({email});
  
      if (!user || !await bcrypt.compare(password, user.password)) {
        res.locals.email = email;
        res.locals.error = res.__('ivalid user');
        res.render('login');
        return;
      }
*/
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

  async postJWT (req, res, next){
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
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '2d'});

      res.json({token})
  
    } catch(err) {
      next(err);
  }
  }
}

module.exports = new LoginController();
