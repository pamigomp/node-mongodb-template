'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
    endpoint: {type: String, required: true, unique: true},
    keys: {
        auth: {type: String, required: true, unique: true},
        p256dh: {type: String, required: true, unique: true},
    }
}, {timestamps: true});

module.exports = SubscriptionSchema;
