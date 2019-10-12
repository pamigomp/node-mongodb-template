'use strict';
const {orderService} = require('../services/index');
const logger = require('../../libs/logger');

module.exports = {
    getAllOrders(req, res, next) {
        return orderService.getAllOrders().then((orders) => {
            res.status(200).send(orders);
        }).catch(next);
    },

    getOrder(req, res, next) {
        return orderService.getOrderById(req.params.orderId).then((order) => {
            if (!order) {
                const msg = `Cannot find order with ID ${req.params.orderId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(order);
            }
        }).catch(next);
    },

    updateOrder(req, res, next) {
        return orderService.updateOrderById(req.params.orderId, req.body).then((order) => {
            if (!order) {
                const msg = `Cannot find order with ID ${req.params.orderId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Order with ID: ${order._id} was successfully updated`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    deleteOrder(req, res, next) {
        return orderService.deleteOrderById(req.params.orderId).then((order) => {
            if (!order) {
                const msg = `Cannot find order with ID ${req.params.orderId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Order with ID: ${order._id} was successfully deleted`;
                logger.info(msg);
                res.status(200).send({message: msg});
            }
        }).catch(next);
    },

    getAllOrdersForCustomerWithId(req, res, next) {
        return orderService.getAllOrdersForCustomerWithId(req.params.customerId).then((orders) => {
            if (!orders.length) {
                const msg = `Cannot find any orders for customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                res.status(200).send(orders);
            }
        }).catch(next);
    },

    createOrderForCustomerWithId(req, res, next) {
        return orderService.createOrderForCustomerWithId(req.params.customerId, req.body).then((data) => {
            if (!data.customer) {
                const msg = `Cannot find customer with ID ${req.params.customerId}`;
                logger.warn(msg);
                res.status(400).send({message: msg});
            } else {
                const msg = `Order with ID: ${data.order._id} was successfully created`;
                logger.info(msg);
                res.status(201).send({message: msg});
            }
        }).catch(next);
    }
};
