'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    endpoint: {type: String, required: true},
    keys: {
        auth: {type: String, required: true},
        p256dh: {type: String, required: true},
    }
}, {timestamps: true});

module.exports = SubscriptionSchema;
