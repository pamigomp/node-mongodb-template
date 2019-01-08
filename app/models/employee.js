'use strict';
const mongoose = require('mongoose');
const EmployeeSchema = require('./schemas/employee');

module.exports = mongoose.model('Employee', EmployeeSchema);
