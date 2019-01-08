'use strict';
const mongoose = require('mongoose');
const FeedbackSchema = require('./schemas/feedback');

module.exports = mongoose.model('Feedback', FeedbackSchema);
