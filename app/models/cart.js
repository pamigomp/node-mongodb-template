'use strict';
const mongoose = require('mongoose');
const CartSchema = require('./schemas/cart');

module.exports = mongoose.model('Cart', CartSchema);
