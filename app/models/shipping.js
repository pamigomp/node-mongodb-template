'use strict';
const mongoose = require('mongoose');
const ShippingSchema = require('./schemas/shipping');

module.exports = mongoose.model('Shipping', ShippingSchema);
