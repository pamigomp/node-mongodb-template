'use strict';
const mongoose = require('mongoose');
const RateSchema = require('./schemas/rate');

module.exports = mongoose.model('Rate', RateSchema);
