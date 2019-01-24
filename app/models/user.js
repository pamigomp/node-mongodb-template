'use strict';
const mongoose = require('mongoose');
const UserSchema = require('./schemas/user');

module.exports = mongoose.model('User', UserSchema);
