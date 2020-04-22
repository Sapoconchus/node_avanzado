'use strict';


/**
 * modify cover picture of Ad
 * you need to own and be logged in to update an Ad.
 *
 * id String the id of the ad to add images to
 * cover File image to upload
 * no response value expected for this operation
 **/
exports.adsCoverIdPOST = function(id,cover) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * create and upload a new Ad
 * you need to be logged in to create a new Ad. The Ad will be linked to the user ID so only the user can update or delete it.
 *
 * body Ad the Ad to be uploaded
 * no response value expected for this operation
 **/
exports.adsCreatePOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * display ads
 *  you can pass query strings to filter, sort, limit, skip and select fields.This way 'anuncialol.swagger.io/ads?title=house&price=-600000' would filter ads with a title 'house' and a price under 600000
 *
 * limit Integer The numbers of items to return. (optional)
 * no response value expected for this operation
 **/
exports.adsGET = function(limit) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * delete an Ad
 * you must own the Ad and be logged in to delete an Ad. Deleting an Ad will also erase al pictures uploded to the API linked to it
 *
 * id String the id of the ad to be displayed
 * no response value expected for this operation
 **/
exports.adsIdDELETE = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * display an Ad by its ID
 * returnns a single AD
 *
 * id String the id of the ad to be displayed
 * no response value expected for this operation
 **/
exports.adsIdGET = function(id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * update an AD. Need to be logged in and be the owner of the Ad
 * change any information input or create a new one. For image (cover and pictures) management, there are explicit path operation
 *
 * body Ad the changes to upload to the AD
 * id String the id of the ad to be displayed
 * no response value expected for this operation
 **/
exports.adsIdPUT = function(body,id) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * ad pictures to Ad
 * you need to own and be logged in to update a new Ad. The pictures upload will overwrite the pictures of the ad, so if you want to keep old pictures you should pass them on the array.
 *
 * picture1 File 
 * id String the id of the ad to add images to
 * picture2 File  (optional)
 * picture3 File  (optional)
 * picture4 File  (optional)
 * picture5 File  (optional)
 * picture6 File  (optional)
 * picture7 File  (optional)
 * picture8 File  (optional)
 * no response value expected for this operation
 **/
exports.adsPicsIdPOST = function(picture1,id,picture2,picture3,picture4,picture5,picture6,picture7,picture8) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

