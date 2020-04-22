'use strict';


/**
 * User access to application
 * it is necessaary to have access to user's ads in order to edit or delete. It creates a cookie on localStore with a session expiring date unless especified otherwise
 *
 * body List user data
 * no response value expected for this operation
 **/
exports.usersLoginPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create user
 * Create a user on the application
 *
 * body User Created user object
 * no response value expected for this operation
 **/
exports.usersRegisterPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

