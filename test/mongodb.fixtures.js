'use strict'

const Ad = require('../models/Ad')
const User = require('../models/User')
const AdsData = require('./ads.json')

module.exports.initAds = async function () {
  await Anuncio.remove()
  await Anuncio.insertMany(AdsData.anuncios)
}

module.exports.initUsers = async function () {
  await Usuario.remove()
  await Usuario.insertMany([
    {name: 'user', email: 'user@example.com', password: User.hashPassword('1234')}
  ])
}
