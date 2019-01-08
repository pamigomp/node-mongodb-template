'use strict';
const mongoose = require('mongoose');
const ImageSchema = require('./schemas/image');

module.exports = mongoose.model('Image', ImageSchema);
