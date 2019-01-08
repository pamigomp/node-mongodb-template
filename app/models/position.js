'use strict';
const mongoose = require('mongoose');
const PositionSchema = require('./schemas/position');

module.exports = mongoose.model('Position', PositionSchema);
