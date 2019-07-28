'use strict';
const passport = require('passport');

function authenticate(req, res, next, strategy, options) {
    return passport.authenticate(strategy, options, (err, passportUser, info) => {
        if (err) {
            next(err);
        } else if (passportUser) {
            res.send({user: passportUser.toAuthJSON()});
        } else {
            res.status(400).send(info);
        }
    })(req, res, next);
}

module.exports = {
    signUpCustomerLocal(req, res, next) {
        return authenticate(req, res, next, 'signUp-customer-local', {session: false});
    },

    signInCustomerLocal(req, res, next) {
        return authenticate(req, res, next, 'signIn-customer-local', {session: false});
    },

    signUpEmployeeLocal(req, res, next) {
        return authenticate(req, res, next, 'signUp-employee-local', {session: false});
    },

    signInEmployeeLocal(req, res, next) {
        return authenticate(req, res, next, 'signIn-employee-local', {session: false});
    },

    signInCustomerFacebook(req, res, next) {
        return authenticate(req, res, next, 'signIn-customer-facebook', {
            session: false,
            scope: ['email', 'public_profile']
        });
    }
};
