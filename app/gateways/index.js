'use strict';
const cartGateway = require('./cart');
const categoryGateway = require('./category');
const customerGateway = require('./customer');
const employeeGateway = require('./employee');
const feedbackGateway = require('./feedback');
const imageGateway = require('./image');
const orderGateway = require('./order');
const positionGateway = require('./position');
const producerGateway = require('./producer');
const productGateway = require('./product');
const pushNotificationGateway = require('./pushNotification');
const rateGateway = require('./rate');
const shippingGateway = require('./shipping');

module.exports = {
    cartGateway,
    categoryGateway,
    customerGateway,
    employeeGateway,
    feedbackGateway,
    imageGateway,
    orderGateway,
    positionGateway,
    producerGateway,
    productGateway,
    pushNotificationGateway,
    rateGateway,
    shippingGateway
};
