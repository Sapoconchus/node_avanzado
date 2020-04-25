'use strict';

class PrivadoController {

  index(req, res, next) {
    res.render('private');
  }

}

module.exports = new PrivadoController();