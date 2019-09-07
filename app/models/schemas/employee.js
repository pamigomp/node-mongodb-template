'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    positionId: {type: mongoose.Types.ObjectId, required: true, ref: 'Position'},
    lastLogin: {type: Date, required: true},
    salt: {type: String, required: false}
}, {timestamps: true});

EmployeeSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

EmployeeSchema.statics.generateHash = function (password, salt) {
    return bcrypt.hashSync(password, salt);
};

EmployeeSchema.statics.generateSalt = function (rounds) {
    return bcrypt.genSaltSync(rounds || 8);
};

EmployeeSchema.methods.generateJWT = function () {
    return jwt.sign({
        username: this.username,
        id: this._id,
        role: 'Admin'
    }, process.env.SECRET_KEY, {expiresIn: '1h'});
};

EmployeeSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        username: this.username,
        token: this.generateJWT(),
    };
};

EmployeeSchema.pre('save', function (next) {
    this.salt = this.constructor.generateSalt(8);
    this.password = this.constructor.generateHash(this.password, this.salt);
    next();
});

EmployeeSchema.pre('update', function (next) {
    if (this.isModified('password')) {
        this.password = EmployeeSchema.generateHash(this.password, this.salt);
    }
    next();
});

module.exports = EmployeeSchema;
