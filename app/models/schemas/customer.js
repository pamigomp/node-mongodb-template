'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const timestampPlugin = require('../plugins/timestamp');
const {postalCodeValidator, phoneValidator, emailValidator} = require('../validators/validators');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    email: {type: String, required: true, index: {unique: true}, validate: emailValidator},
    password: {type: String, required: true, minlength: 8, maxlength: 32},
    firstName: {type: String, required: true, maxlength: 32},
    lastName: {type: String, required: true, maxlength: 64},
    gender: {type: String, required: false, enum: ['F', 'M']},
    dob: {type: Date, required: false},
    street: {type: String, required: false, maxlength: 32},
    postalCode: {type: String, required: false, validate: postalCodeValidator},
    city: {type: String, required: false, maxlength: 32},
    phone: {type: Number, required: false, validate: phoneValidator},
    regular: {type: Boolean, required: false, default: true},
    lastLogin: {type: Date, required: false},
    salt: {type: String, required: false}
});

CustomerSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

CustomerSchema.statics.generateHash = function (password, salt) {
    return bcrypt.hashSync(password, salt);
};

CustomerSchema.statics.generateSalt = function (rounds) {
    return bcrypt.genSaltSync(rounds || 8);
};

CustomerSchema.methods.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, process.env.SECRET_KEY);
};

CustomerSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

CustomerSchema.pre('save', function (next) {
    this.salt = this.constructor.generateSalt(8);
    this.password = this.constructor.generateHash(this.password, this.salt);
    next();
});

CustomerSchema.pre('update', function (next) {
    if (this.isModified('password')) {
        this.password = CustomerSchema.generateHash(this.password, this.salt);
    }
    next();
});

CustomerSchema.plugin(timestampPlugin);

module.exports = CustomerSchema;
