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
}

module.exports = new SiteController();
