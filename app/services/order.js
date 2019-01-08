'use strict';
const {orderGateway, customerGateway} = require('../gateways/index');

module.exports = {
    getAllOrders() {
        return orderGateway.getAllOrders();
    },

    createOrder(newOrder) {
        return orderGateway.createOrder(newOrder);
    },

    getOrderById(id) {
        return orderGateway.getOrderById(id);
    },

    updateOrderById(id, newOrder) {
        return orderGateway.updateOrderById(id, newOrder);
    },

    deleteOrderById(id) {
        return orderGateway.deleteOrderById(id);
    },

    getAllOrdersForCustomerWithId(id) {
        return orderGateway.getOrdersByCustomerId(id);
    },

    createOrderForCustomerWithId(id, newOrder) {
        const res = {};
        return customerGateway.getCustomerById(id).then((customer) => {
            res.customer = customer;
            if (customer) {
                return orderGateway.createOrder(newOrder);
            } else {
                return Promise.resolve();
            }
        }).then((order) => {
            res.order = order;
            return res;
        });
    }
};
