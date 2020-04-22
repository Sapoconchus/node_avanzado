'use strict';

var utils = require('../utils/writer.js');
var Users = require('../service/UsersService');

module.exports.usersLoginPOST = function usersLoginPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Users.usersLoginPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.usersRegisterPOST = function usersRegisterPOST (req, res, next) {
  var body = req.swagger.params['body'].value;
  Users.usersRegisterPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
