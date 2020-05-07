'use strict';

class SiteController {

  index(req, res, next) {
    try {
      res.render('index', {});
    } catch(err) {
      next(err);
    }
  }

  documentation(req, res, next) {
    try {
      res.render('documentation', {});
    } catch(err) {
      next(err);
    }
  };

  language(req, res, next) {
    try {
      //const lang = req.cookies('anunciaLOL_lang');
      req.cookies.siteLanguage = "en";
      console.log(req.cookies);

      req.session.locale = "en";
      

      res.redirect(req.get('referer'))
    } catch(err) {
      next(err);
    }
  };


}

module.exports = new SiteController();
