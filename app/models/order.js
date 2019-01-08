'use strict';
const mongoose = require('mongoose');
const OrderSchema = require('./schemas/order');

module.exports = mongoose.model('Order', OrderSchema);
