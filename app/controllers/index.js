'use strict';
const cartController = require('./cart');
const categoryController = require('./category');
const customerController = require('./customer');
const employeeController = require('./employee');
const feedbackController = require('./feedback');
const imageController = require('./image');
const orderController = require('./order');
const positionController = require('./position');
const producerController = require('./producer');
const productController = require('./product');
const rateController = require('./rate');
const shippingController = require('./shipping');

module.exports = {
    cartController,
    categoryController,
    customerController,
    employeeController,
    feedbackController,
    imageController,
    orderController,
    positionController,
    producerController,
    productController,
    rateController,
    shippingController
};
