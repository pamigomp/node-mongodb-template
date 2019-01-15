'use strict';
const passport = require('passport');

module.exports = {
    signUp(req, res, next) {
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

    signIn(req, res, next) {
        return passport.authenticate('local-signIn', {session: false}, (err, passportUser, info) => {
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
