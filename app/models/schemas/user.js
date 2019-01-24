'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const timestampPlugin = require('../plugins/timestamp');
const {postalCodeValidator, phoneValidator, emailValidator} = require('../validators/validators');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: {type: String, required: true},
    email: {type: String, required: true, index: {unique: true}, validate: emailValidator},
    name: {type: String, required: true, maxlength: 128},
    gender: {type: String, required: false, enum: ['F', 'M']},
    dob: {type: Date, required: false},
    street: {type: String, required: false, maxlength: 32},
    postalCode: {type: String, required: false, validate: postalCodeValidator},
    city: {type: String, required: false, maxlength: 32},
    phone: {type: Number, required: false, validate: phoneValidator},
    regular: {type: Boolean, required: false, default: true},
    lastLogin: {type: Date, required: false},
    token: {type: String, required: false},
    provider: {type: String, required: false, enum: ['FACEBOOK', 'GOOGLE', 'INSTAGRAM', 'TWITTER']},
    profilePicture: {type: String, required: false},
    emailVerified: {type: Boolean, required: false, default: false},
    salt: {type: String, required: false}
});

UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

UserSchema.statics.generateHash = function (password, salt) {
    return bcrypt.hashSync(password, salt);
};

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

UserSchema.pre('save', function (next) {
    this.salt = this.constructor.generateSalt(8);
    this.password = this.constructor.generateHash(this.password, this.salt);
    next();
});

UserSchema.pre('update', function (next) {
    if (this.isModified('password')) {
        this.password = UserSchema.generateHash(this.password, this.salt);
    }
    next();
});

UserSchema.plugin(timestampPlugin);

module.exports = UserSchema;
