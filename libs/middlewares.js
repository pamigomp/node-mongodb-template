'use strict';
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const validator = require('express-validator');
const helmet = require('helmet');
const methodOverride = require('method-override');
const morgan = require('morgan');
const responseTime = require('response-time');
const passport = require('passport');
const session = require('express-session');
const logger = require('./logger');

const isProduction = process.env.NODE_ENV === 'production';
const allowedOrigins = [process.env.APP_URL];

module.exports = (app) => {

    app.use(responseTime());
    app.use(helmet());
    app.use(cors({
        origin: (origin, next) => {
            if (!origin) {
                next(null, true);
            } else if (allowedOrigins.indexOf(origin) === -1) {
                const msg = 'The CORS policy for this site does not allow access from the specified Origin';
                next(new Error(msg), false);
            } else {
                next(null, true);
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Access-Token'],
        preflightContinue: false
    }));
    app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" status: :status :res[content-length] - :response-time ms ":referrer" ":user-agent"', {
        stream: logger.stream
    }));
    app.use(compression());
    app.use(bodyParser.json({limit: '5mb'}));
    app.use(bodyParser.json({type: 'application/vnd.api+json'}));
    app.use(bodyParser.urlencoded({extended: true, limit: '5mb'}));
    app.use(validator());
    app.use(cookieParser());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use((req, res, next) => {
        if (isProduction && !(req.secure || req.headers['x-forwarded-proto'] === 'https')) {
            res.redirect(`https://${req.hostname}:${process.env.PORT_HTTPS}${req.url}`);
        } else {
            next();
        }
    });
    app.use(session({
        secret: process.env.SECRET_KEY,
        cookie: {maxAge: 60000},
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    if (!isProduction) {
        app.use(errorHandler({log: errorNotification}));
    }

    function errorNotification(err, str, req) {
        const title = `Error in ${req.method} ${req.url}`;
        logger.error(title, str);
    }
};
