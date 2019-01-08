'use strict';
const mongoose = require('mongoose');
const CustomerSchema = require('./schemas/customer');

module.exports = mongoose.model('Customer', CustomerSchema);
