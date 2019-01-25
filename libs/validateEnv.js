'use strict';
const {cleanEnv, str, host, port, url} = require('envalid');

module.exports = () => {
    cleanEnv(process.env, {
        DB_USERNAME: str(),
        DB_PASSWORD: str(),
        DB_HOST: host(),
        DB_PORT: port(),
        DB_DATABASE: str(),
        APP_URL: str(),
        SECRET_KEY: str(),
        FB_APP_ID: str(),
        FB_APP_SECRET: str(),
        FB_CALLBACK_URL: url()
    });
};
