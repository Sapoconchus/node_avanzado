'use strict';

const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./anuncialol_swagger.json');
 
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;