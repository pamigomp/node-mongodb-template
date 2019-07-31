'use strict';
const cartService = require('./cart');
const categoryService = require('./category');
const customerService = require('./customer');
const employeeService = require('./employee');
const feedbackService = require('./feedback');
const imageService = require('./image');
const orderService = require('./order');
const positionService = require('./position');
const producerService = require('./producer');
const productService = require('./product');
const pushNotificationService = require('./pushNotification');
const rateService = require('./rate');
const shippingService = require('./shipping');

module.exports = {
    cartService,
    categoryService,
    customerService,
    employeeService,
    feedbackService,
    imageService,
    orderService,
    positionService,
    producerService,
    productService,
    pushNotificationService,
    rateService,
    shippingService
};
