'use strict';
const mongoose = require('mongoose');
const ProducerSchema = require('./schemas/producer');

module.exports = mongoose.model('Producer', ProducerSchema);
