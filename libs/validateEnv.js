'use strict';
const {cleanEnv, str, host, port} = require('envalid');

module.exports = () => {
    cleanEnv(process.env, {
        DB_USERNAME: str(),
        DB_PASSWORD: str(),
        DB_HOST: host(),
        DB_PORT: port(),
        DB_DATABASE: str(),
        APP_URL: str(),
        SECRET_KEY: str()
    });
};
