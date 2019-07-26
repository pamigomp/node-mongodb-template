'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    value: {type: String, required: true, maxlength: 256},
    customerId: {type: mongoose.Types.ObjectId, required: true, unique: true},
    productId: {type: mongoose.Types.ObjectId, required: true, unique: true}
}, {timestamps: true});

module.exports = FeedbackSchema;
