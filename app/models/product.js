'use strict';
const mongoose = require('mongoose');
const ProductSchema = require('./schemas/product');

module.exports = mongoose.model('Product', ProductSchema);
