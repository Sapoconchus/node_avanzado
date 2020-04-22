'use strict';

var utils = require('../utils/writer.js');
var Ads = require('../service/AdsService');

module.exports.adsCoverIdPOST = function adsCoverIdPOST (req, res, next) {
  var id = req.swagger.params['id'].value;
  var cover = req.swagger.params['cover'].value;
  Ads.adsCoverIdPOST(id,cover)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adsCreatePOST = function adsCreatePOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Ads.adsCreatePOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adsGET = function adsGET (req, res, next) {
  var limit = req.swagger.params['limit'].value;
  Ads.adsGET(limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adsIdDELETE = function adsIdDELETE (req, res, next) {
  var id = req.swagger.params['id'].value;
  Ads.adsIdDELETE(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adsIdGET = function adsIdGET (req, res, next) {
  var id = req.swagger.params['id'].value;
  Ads.adsIdGET(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adsIdPUT = function adsIdPUT (req, res, next) {
  var body = req.swagger.params['body'].value;
  var id = req.swagger.params['id'].value;
  Ads.adsIdPUT(body,id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.adsPicsIdPOST = function adsPicsIdPOST (req, res, next) {
  var picture1 = req.swagger.params['picture1'].value;
  var id = req.swagger.params['id'].value;
  var picture2 = req.swagger.params['picture2'].value;
  var picture3 = req.swagger.params['picture3'].value;
  var picture4 = req.swagger.params['picture4'].value;
  var picture5 = req.swagger.params['picture5'].value;
  var picture6 = req.swagger.params['picture6'].value;
  var picture7 = req.swagger.params['picture7'].value;
  var picture8 = req.swagger.params['picture8'].value;
  Ads.adsPicsIdPOST(picture1,id,picture2,picture3,picture4,picture5,picture6,picture7,picture8)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
