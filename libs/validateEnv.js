'use strict';
const {cleanEnv, str, url} = require('envalid');

module.exports = () => {
    cleanEnv(process.env, {
        MONGODB_URI: str(),
        APP_URLS: str(),
        SECRET_KEY: str(),
        FB_APP_ID: str(),
        FB_APP_SECRET: str(),
        FB_CALLBACK_URL: url()
    });
};
