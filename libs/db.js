'use strict';
const mongoose = require('mongoose');
const logger = require('./logger');
const seed = require('./seed');

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

let db = null;

module.exports = () => {
    if (!db) {
        const uri = process.env.MONGODB_URI;
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        mongoose.connect(uri, options)
            .then(seed);

        db = mongoose.connection;

        db.on('connecting', () => {
            logger.info('Connecting to MongoDB...');
        });

        db.on('connected', () => {
            logger.info('Successfully connected to MongoDB');
        });

        db.on('error', (err) => {
            return db.close(() => {
                logger.error(`Mongoose default connection error: ${err}`);
                process.exit(0);
            });
        });

        db.on('open', () => {
            logger.info('MongoDB connection opened!');
        });

        db.on('close', () => {
            logger.info('MongoDB connection closed!');
        });

        db.on('disconnecting', () => {
            logger.info('Disconnecting from MongoDB...');
        });

        db.on('disconnected', () => {
            logger.info('Mongoose default connection disconnected');
        });

        db.on('reconnected', () => {
            logger.info('Mongoose default connection reconnected');
        });

        process.on('SIGINT', () => {
            return db.close(() => {
                logger.info('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    }
    return db;
};
