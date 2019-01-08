'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {type: String, unique: true, default: '<default_product_image>', maxlength: 128},
    productId: {type: mongoose.Types.ObjectId, required: true, unique: true}
});

ImageSchema.plugin(timestampPlugin);

module.exports = ImageSchema;
