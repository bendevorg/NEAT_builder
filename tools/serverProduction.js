'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const logger = require('./logger');

const app = express();

//    app.use('/static', express.static('dist/static'));
app.use('/', express.static('dist'));
app.use('/games/*', express.static('dist'));
app.use(logger.errorHandler());

module.exports = app;
