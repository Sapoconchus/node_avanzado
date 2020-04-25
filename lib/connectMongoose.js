'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
});

conn.on('open', () => {
  console.log('connected to ' + conn.name);
});

conn.on('error', err => {
  console.error('connection error ', err);
});

module.exports = conn;
