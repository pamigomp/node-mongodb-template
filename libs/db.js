'use strict';
const mongoose = require('mongoose');
const logger = require('./logger');
const categoriesData = require('../app/models/seeds/categories');
const CategoryModel = require('../app/models/category');

if (process.env.NODE_ENV === 'development') {
    mongoose.set('debug', true);
}

let db = null;

const initializeCategoriesCollection = () => {
    return CategoryModel.findOne().then((data) => {
        const promises = [];
        if (!data) {
            categoriesData.forEach((category) => {
                promises.push(CategoryModel(category).save().then(() => {
                    logger.info(`Successfully created category with name ${category.name}`);
                }).catch((err) => {
                    logger.error(err);
                }));
            });
        }
        return Promise.all(promises);
    });
};

module.exports = () => {
    if (!db) {
        const uri = process.env.MONGODB_URI;
        const options = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        mongoose.connect(uri, options)
            .then(initializeCategoriesCollection());

        db = mongoose.connection;

        db.on('connecting', () => {
            logger.info('Connecting to MongoDB...');
        });

        db.on('connected', () => {
            logger.info('Successfully connected to MongoDB');
        });

        db.on('error', (err) => {
            db.close(() => {
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
            db.close(() => {
                logger.info('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    }
    return db;
};
