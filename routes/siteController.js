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
      const lang = req.params.lang;
      console.log(req.cookies);

      res.cookie('siteLanguage', lang, {maxAge: 1000 * 60 *60 * 24 * 10}) //10 days

      res.redirect(req.get('referer'));

    } catch(err) {
      next(err);
    }
  };


}

module.exports = new SiteController();
