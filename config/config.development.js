'use strict';
const result = require('dotenv').config({path: './config/.env.development'});
const logger = require('../libs/logger');

if (result.error) {
    throw result.error;
}

const envs = JSON.stringify(result.parsed);
logger.info(`Created env variables: ${envs}`);

module.exports = {};
