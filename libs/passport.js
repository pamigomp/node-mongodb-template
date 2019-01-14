'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('./logger');
const Customer = require('../app/models/customer');

const signIn = (email, password, done) => {
    return Customer.findOne({email: email}).then((user) => {
        if (!user || !user.validatePassword(password)) {
            const msg = 'Username and/or password is invalid';
            logger.warn(msg);
            return done(null, false, {message: msg});
        } else {
            user.lastLogin = new Date();
            return Customer.findByIdAndUpdate(user.id, user, {new: true}).then((updatedUser) => {
                const msg = `Customer with ID: ${updatedUser._id} was successfully signed in`;
                logger.info(msg);
                return done(null, updatedUser, {message: msg});
            });
        }
    }).catch(done);
};

const signUp = (req, email, password, done) => {
    return Customer.findOne({email: email}).then((user) => {
        if (user) {
            const msg = 'Username is already taken';
            logger.warn(msg);
            return done(null, false, {message: msg});
        } else {
            const newUser = {
                email: email,
                password: password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                lastLogin: new Date()
            };
            return Customer.create(newUser).then((newUser) => {
                const msg = `Customer with ID: ${newUser._id} was successfully signed up`;
                logger.info(msg);
                return done(null, newUser, {message: msg});
            });
        }
    }).catch(done);
};

module.exports = () => {
    passport.use('local-signIn', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, signIn));

    passport.use('local-signUp', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, signUp));
};
