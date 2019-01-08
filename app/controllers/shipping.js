'use strict';
const {shippingService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getAllShippings(req, res, next) {
        return shippingService.getAllShippings().then((shippings) => {
            res.status(200).send(shippings);
        }).catch(next);
    },

    createShipping(req, res, next) {
        return shippingService.createShipping(req.body).then((shipping) => {
            const msg = `Shipping with ID: ${shipping._id} was successfully created`;
            logger.info(msg);
            res.status(201).send({message: msg});
        }).catch(next);
    },

    getShipping(req, res, next) {
        return shippingService.getShippingById(req.params.shippingId).then((shipping) => {
            if (!shipping) {
                const msg = `Cannot find shipping with ID ${req.params.shippingId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(shipping);
            }
        }).catch(next);
    },

    updateShipping(req, res, next) {
        return shippingService.updateShippingById(req.params.shippingId, req.body).then((shipping) => {
            if (!shipping) {
                const msg = `Cannot find shipping with ID ${req.params.shippingId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Shipping with ID: ${shipping._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteShipping(req, res, next) {
        return shippingService.deleteShippingById(req.params.shippingId).then((shipping) => {
            if (!shipping) {
                const msg = `Cannot find shipping with ID ${req.params.shippingId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Shipping with ID: ${shipping._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    }
};
