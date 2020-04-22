'use strict';

const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
  title: String,
  price: Number,
  description: mongoose.Schema.Types.Mixed,
  cover: String,
  pictures: Array,
  type: Boolean,
  city: String, 
  tags: Array,
  user: String,
});

//METHODS

//filter
adSchema.statics.filter = function (filter, limit, skip, sort, fields) {
  return Ad.find(filter).limit(limit).skip(skip).sort(sort).select(fields);
};

const Ad = mongoose.model('Ad',adSchema);

module.exports = Ad;