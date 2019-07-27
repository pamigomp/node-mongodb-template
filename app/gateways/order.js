'use strict';
const orderModel = require('../models/order');

const getOrders = (query) => {
    return orderModel.find(query).lean();
};

const deleteOrder = (query) => {
    return orderModel.findOneAndRemove(query);
};

module.exports = {
    getAllOrders() {
        const query = {};
        return getOrders(query);
    },

    createOrder(newOrder) {
        return orderModel.create(newOrder);
    },

    getOrderById(id) {
        return orderModel.findById(id).select(['-createdAt', '-updatedAt', '-__v']);
    },

    updateOrderById(id, updatedOrder) {
        return orderModel.findByIdAndUpdate(id, updatedOrder, {new: true});
    },

    deleteOrderById(id) {
        return orderModel.findByIdAndRemove(id);
    },

    getOrdersByEmployeeId(id) {
        const query = {employeeId: id};
        return getOrders(query);
    },

    getOrdersByCustomerId(id) {
        const query = {customerId: id};
        return getOrders(query);
    },

    getOrdersByShippingId(id) {
        const query = {shippingId: id};
        return getOrders(query);
    },

    deleteOrderByEmployeeId(id) {
        const query = {employeeId: id};
        return deleteOrder(query);
    },

    deleteOrderByCustomerId(id) {
        const query = {customerId: id};
        return deleteOrder(query);
    },

    deleteOrderByShippingId(id) {
        const query = {shippingId: id};
        return deleteOrder(query);
    }
};
