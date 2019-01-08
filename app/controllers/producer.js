'use strict';
const {producerService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getAllProducers(req, res, next) {
        return producerService.getAllProducers().then((producers) => {
            res.status(200).send(producers);
        }).catch(next);
    },

    createProducer(req, res, next) {
        return producerService.createProducer(req.body).then((producer) => {
            const msg = `Producer with ID: ${producer._id} was successfully created`;
            logger.info(msg);
            res.status(201).send({message: msg});
        }).catch(next);
    },

    getProducer(req, res, next) {
        return producerService.getProducerById(req.params.producerId).then((producer) => {
            if (!producer) {
                const msg = `Cannot find producer with ID ${req.params.producerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(producer);
            }
        }).catch(next);
    },

    updateProducer(req, res, next) {
        return producerService.updateProducerById(req.params.producerId, req.body).then((producer) => {
            if (!producer) {
                const msg = `Cannot find producer with ID ${req.params.producerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Producer with ID: ${producer._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteProducer(req, res, next) {
        return producerService.deleteProducerById(req.params.producerId).then((producer) => {
            if (!producer) {
                const msg = `Cannot find producer with ID ${req.params.producerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Producer with ID: ${producer._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    }
};
