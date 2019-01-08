'use strict';
const validator = require('validator');

function postalCodeValidator(val) {
    return validator.matches(val, /\d{2}-\d{3}/);
}

function phoneValidator(val) {
    return validator.matches(val, /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/);
}

function emailValidator(val) {
    return validator.isEmail(val);
}

module.exports = {
    postalCodeValidator: [postalCodeValidator, ''],
    phoneValidator: [phoneValidator, ''],
    emailValidator: [emailValidator, '']
};
