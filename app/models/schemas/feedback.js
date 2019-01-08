'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');

const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    value: {type: String, required: true, maxlength: 256},
    customerId: {type: mongoose.Types.ObjectId, required: true, unique: true},
    productId: {type: mongoose.Types.ObjectId, required: true, unique: true}
});

FeedbackSchema.plugin(timestampPlugin);

module.exports = FeedbackSchema;
