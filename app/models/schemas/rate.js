'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RateSchema = new Schema({
    value: {type: String, required: true, enum: ['1', '2', '3', '4', '5']},
    customerId: {type: mongoose.Types.ObjectId, required: true, unique: true},
    productId: {type: mongoose.Types.ObjectId, required: true, unique: true}
}, {timestamps: true});

module.exports = RateSchema;
