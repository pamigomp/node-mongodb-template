'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: {
        type: String,
        default: 'https://via.placeholder.com/512',
        maxlength: 256,
        required: false
    },
    productId: {type: mongoose.Types.ObjectId, required: true, ref: 'Product'}
}, {timestamps: true});

ImageSchema.index({url: 1, productId: 1}, {unique: true});

module.exports = ImageSchema;
