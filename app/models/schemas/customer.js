'use strict';
const mongoose = require('mongoose');
const timestampPlugin = require('../plugins/timestamp');
const {postalCodeValidator, phoneValidator, emailValidator} = require('../validators/validators');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    username: {type: String, required: true, unique: true, maxlength: 32},
    password: {type: String, required: true, minlength: 8, maxlength: 32},
    name: {type: String, required: true, maxlength: 32},
    surname: {type: String, required: true, maxlength: 64},
    gender: {type: String, required: true, enum: ['F', 'M']},
    dob: {type: Date, required: true},
    street: {type: String, required: true, maxlength: 32},
    postalCode: {type: String, required: true, validate: postalCodeValidator},
    city: {type: String, required: true, maxlength: 32},
    phone: {type: Number, required: true, validate: phoneValidator},
    email: {type: String, required: true, unique: true, validate: emailValidator},
    regular: {type: Boolean, required: true, default: false}
});

CustomerSchema.plugin(timestampPlugin);

module.exports = CustomerSchema;
