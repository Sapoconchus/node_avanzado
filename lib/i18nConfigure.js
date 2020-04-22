'use strict';

const i18n = require('i18n');
const path = require('path');

module.exports = function () {
  i18n.configure({
    locales: ['en', 'es'],
    directory: path.join(__dirname, '..', 'locales'),
    defaultLocale: 'en',
    autoReload: true, //reload lang files if they change
    syncFiles: true, // creates literals on all locales
  });

  //in case you want to use i18n on scripts

  i18n.setLocale('en');
  
  return i18n;
};
