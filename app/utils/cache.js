'use strict';
const mcache = require('memory-cache');

if (process.env.NODE_ENV === 'development') {
    mcache.debug(true);
}

const HOUR_IN_SECONDS = 60 * 60;

module.exports = (duration = HOUR_IN_SECONDS) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(key);
        if (cachedBody) {
            try {
                cachedBody = JSON.parse(cachedBody);
            } finally {
                res.send(cachedBody);
            }
        } else {
            res.sendResponse = res.send;
            res.send = (body) => {
                if (res.statusCode.toString().startsWith('2')) {
                    mcache.put(key, body, duration * 1000);
                }
                res.sendResponse(body);
            };
            next();
        }
    };
};
