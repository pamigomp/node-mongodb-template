'use strict';
const authController = require('./auth');
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
const pushNotificationController = require('./pushNotification');
const rateController = require('./rate');
const shippingController = require('./shipping');

module.exports = {
    authController,
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
    pushNotificationController,
    rateController,
    shippingController
};
