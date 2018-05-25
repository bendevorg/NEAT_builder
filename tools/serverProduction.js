'use strict';
/* eslint-disable no-console */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const logger = require('./logger');

const app = express();

app.use('/', express.static('dist'));
app.use(logger.errorHandler());

module.exports = app;
