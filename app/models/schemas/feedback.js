'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    value: {type: String, required: true, maxlength: 256},
    customerId: {type: mongoose.Types.ObjectId, required: true},
    productId: {type: mongoose.Types.ObjectId, required: true}
}, {timestamps: true});

FeedbackSchema.index({customerId: 1, productId: 1}, {unique: true});

module.exports = FeedbackSchema;
