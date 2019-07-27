'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RateSchema = new Schema({
    value: {type: String, required: true, enum: ['1', '2', '3', '4', '5']},
    customerId: {type: mongoose.Types.ObjectId, required: true},
    productId: {type: mongoose.Types.ObjectId, required: true}
}, {timestamps: true});

RateSchema.index({customerId: 1, productId: 1}, {unique: true});

module.exports = RateSchema;
