'use strict';
const passport = require('passport');

module.exports = {
    signUp(req, res, next) {
        return passport.authenticate('local-signUp', {session: false}, (err, passportUser, info) => {
            if (err) {
                return next(err);
            } else if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();
                return res.json({user: user.toAuthJSON()});
            } else {
                res.status(400).send(info);
            }
        })(req, res, next);
    },

    signIn(req, res, next) {
        return passport.authenticate('local-signIn', {session: false}, (err, passportUser, info) => {
            if (err) {
                return next(err);
            } else if (passportUser) {
                const user = passportUser;
                user.token = passportUser.generateJWT();
                return res.json({user: user.toAuthJSON()});
            } else {
                res.status(400).send(info);
            }
        })(req, res, next);
    }
};
