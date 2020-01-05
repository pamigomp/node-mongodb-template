'use strict';
const validator = require('validator');

function postalCodeValidator(val) {
    if (val) {
        return validator.matches(val, /\d{2}-\d{3}/);
    }
    return true;
}

function phoneValidator(val) {
    if (val) {
        return validator.matches(val, /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/);
    }
    return true;
}

function emailValidator(val) {
    return validator.isEmail(val);
}

module.exports = {
    postalCodeValidator: [postalCodeValidator, 'Invalid postal code'],
    phoneValidator: [phoneValidator, 'Invalid phone number'],
    emailValidator: [emailValidator, 'Invalid e-mail']
};
