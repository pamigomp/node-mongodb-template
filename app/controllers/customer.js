'use strict';
const {customerService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getAllCustomers(req, res, next) {
        return customerService.getAllCustomers().then((customers) => {
            res.status(200).send(customers);
        }).catch(next);
    },

    createCustomer(req, res, next) {
        return customerService.createCustomer(req.body).then((customer) => {
            const msg = `Customer with ID: ${customer._id} was successfully created`;
            logger.info(msg);
            res.status(201).send({message: msg});
        }).catch(next);
    },

    getCustomer(req, res, next) {
        return customerService.getCustomerById(req.params.customerId).then((customer) => {
            if (!customer) {
                const msg = `Cannot find customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(customer);
            }
        }).catch(next);
    },

    updateCustomer(req, res, next) {
        return customerService.updateCustomerById(req.params.customerId, req.body).then((customer) => {
            if (!customer) {
                const msg = `Cannot find customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Customer with ID: ${customer._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteCustomer(req, res, next) {
        return customerService.deleteCustomerById(req.params.customerId).then((customer) => {
            if (!customer) {
                const msg = `Cannot find customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Customer with ID: ${customer._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    }
};
