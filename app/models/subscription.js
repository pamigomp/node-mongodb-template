'use strict';
const mongoose = require('mongoose');
const SubscriptionSchema = require('./schemas/subscription');

module.exports = mongoose.model('Subscription', SubscriptionSchema);
