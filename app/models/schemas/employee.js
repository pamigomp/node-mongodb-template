'use strict';
const mongoose = require('mongoose');
const {postalCodeValidator, phoneValidator, emailValidator} = require('../validators/validators');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    username: {type: String, required: true, unique: true, maxlength: 32},
    password: {type: String, required: true, minlength: 8, maxlength: 32},
    firstName: {type: String, required: true, maxlength: 32},
    lastName: {type: String, required: true, maxlength: 64},
    gender: {type: String, required: true, enum: ['F', 'M']},
    dob: {type: Date, required: true},
    street: {type: String, required: true, maxlength: 32},
    postalCode: {type: String, required: true, validate: postalCodeValidator},
    city: {type: String, required: true, maxlength: 32},
    phone: {type: String, required: true, validate: phoneValidator},
    email: {type: String, required: true, unique: true, validate: emailValidator},
    employmentDate: {type: Date, required: true},
    dismissalDate: {type: Date, required: false},
    positionId: {type: mongoose.Types.ObjectId, required: true, ref: 'Position'}
}, {timestamps: true});

module.exports = EmployeeSchema;
