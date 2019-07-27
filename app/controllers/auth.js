'use strict';
const passport = require('passport');

module.exports = {
    signUpLocal(req, res, next) {
        return passport.authenticate('local-signUp', {session: false}, (err, passportUser, info) => {
            if (err) {
                next(err);
            } else if (passportUser) {
                res.send({user: passportUser.toAuthJSON()});
            } else {
                res.status(400).send(info);
            }
        })(req, res, next);
    },

    signInLocal(req, res, next) {
        return passport.authenticate('local-signIn', {session: false}, (err, passportUser, info) => {
            if (err) {
                next(err);
            } else if (passportUser) {
                res.send({user: passportUser.toAuthJSON()});
            } else {
                res.status(400).send(info);
            }
        })(req, res, next);
    },

    signInFacebook(req, res, next) {
        return passport.authenticate('facebook-signIn', {
            session: false,
            scope: ['email', 'public_profile']
        }, (err, passportUser, info) => {
            if (err) {
                next(err);
            } else if (passportUser) {
                res.send({user: passportUser.toAuthJSON()});
            } else {
                res.status(400).send(info);
            }
        })(req, res, next);
    }
};
