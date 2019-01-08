'use strict';
const {cartService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getCartForCustomerWithId(req, res, next) {
        return cartService.getCartForCustomerWithId(req.params.customerId).then((data) => {
            if (!data.customer) {
                const msg = `Cannot find customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(data.cart);
            }
        }).catch(next);
    },

    createCartForCustomerWithId(req, res, next) {
        return cartService.createCartForCustomerWithId(req.params.customerId, req.body).then((data) => {
            if (!data.customer) {
                const msg = `Cannot find customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Cart with ID: ${data.cart._id} was successfully created`;
                logger.info(msg);
                res.status(201).send({message: msg});
            }
        }).catch(next);
    },

    updateCartForCustomerWithId(req, res, next) {
        return cartService.updateCartForCustomerWithId(req.params.customerId, req.body).then((data) => {
            if (!data.customer) {
                const msg = `Cannot find customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Cart with ID: ${data.cart._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteCartForCustomerWithId(req, res, next) {
        return cartService.deleteCartForCustomerWithId(req.params.customerId).then((data) => {
            if (!data.customer) {
                const msg = `Cannot find customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Cart with ID: ${data.cart._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    }
};
