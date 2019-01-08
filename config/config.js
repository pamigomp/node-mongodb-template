'use strict';
const logger = require('../libs/logger');

module.exports = () => {
    let env = process.env.NODE_ENV;
    if (env) {
        logger.info(`NODE_ENV found. Used ${env}`);
    } else {
        env = 'development';
        logger.info(`NODE_ENV not found. Used ${env} by default`);
    }
    return require(`./config.${env}.js`);
};
