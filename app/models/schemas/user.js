'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {postalCodeValidator, phoneValidator, emailValidator} = require('../validators/validators');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}, validate: emailValidator},
    firstName: {type: String, required: true, maxlength: 32},
    lastName: {type: String, required: true, maxlength: 64},
    gender: {type: String, required: false, enum: ['F', 'M']},
    dob: {type: Date, required: false},
    street: {type: String, required: false, maxlength: 32},
    postalCode: {type: String, required: false, validate: postalCodeValidator},
    city: {type: String, required: false, maxlength: 32},
    phone: {type: String, required: false, validate: phoneValidator},
    regular: {type: Boolean, required: false, default: true},
    lastLogin: {type: Date, required: false},
    token: {type: String, required: false},
    provider: {type: String, required: false, enum: ['FACEBOOK', 'GOOGLE', 'INSTAGRAM', 'TWITTER']},
    profilePicture: {type: String, required: false},
    emailVerified: {type: Boolean, required: false, default: false}
}, {timestamps: true});

UserSchema.statics.generateSalt = function (rounds) {
    return bcrypt.genSaltSync(rounds || 8);
};

UserSchema.methods.generateJWT = function () {
    return jwt.sign({
        email: this.email,
        id: this._id,
        isAdmin: false
    }, process.env.SECRET_KEY, {expiresIn: '1d'});
};

UserSchema.methods.toAuthJSON = function () {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
};

module.exports = UserSchema;
