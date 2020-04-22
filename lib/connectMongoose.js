'use strict';

const mongoose = require('mongoose');

const conn = mongoose.connection;

mongoose.connect('mongodb://localhost/practica_intro_node', { useNewUrlParser: true, useUnifiedTopology: true });

conn.on('open', () => {
  console.log('connected to ' + conn.name);
});

conn.on('error', err => {
  console.error('connection error ', err);
});

module.exports = conn;
