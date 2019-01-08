'use strict';
const {rateService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getRate(req, res, next) {
        return rateService.getRateById(req.params.rateId).then((rate) => {
            if (!rate) {
                const msg = `Cannot find rate with ID ${req.params.rateId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(rate);
            }
        }).catch(next);
    },

    updateRate(req, res, next) {
        return rateService.updateRateById(req.params.rateId, req.body).then((rate) => {
            if (!rate) {
                const msg = `Cannot find rate with ID ${req.params.rateId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Rate with ID: ${rate._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteRate(req, res, next) {
        return rateService.deleteRateById(req.params.rateId).then((rate) => {
            if (!rate) {
                const msg = `Cannot find rate with ID ${req.params.rateId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Rate with ID: ${rate._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    getAllRatesForProductWithId(req, res, next) {
        return rateService.getAllRatesForProductWithId(req.params.productId).then((rates) => {
            res.status(200).send(rates);
        }).catch(next);
    },

    createRateForProductWithId(req, res, next) {
        return rateService.createRateForProductWithId(req.params.productId, req.body).then((data) => {
            if (!data.product) {
                const msg = `Cannot find product with ID ${req.params.productId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Rate with ID: ${data.rate._id} was successfully created`;
                logger.info(msg);
                res.status(201).send({message: msg});
            }
        }).catch(next);
    }
};
