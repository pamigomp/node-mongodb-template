'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const logger = require('./logger');
const Customer = require('../app/models/customer');
const User = require('../app/models/user');

const signInLocal = (email, password, done) => {
    return Customer.findOne({email: email}).then((user) => {
        if (!user || !user.validatePassword(password)) {
            const msg = 'Username and/or password is invalid';
            logger.warn(msg);
            done(null, false, {message: msg});
        } else {
            user.lastLogin = new Date();
            return Customer.findByIdAndUpdate(user._id, user, {new: true}).then((updatedUser) => {
                const msg = `Customer with ID: ${updatedUser._id} was successfully signed in`;
                logger.info(msg);
                done(null, updatedUser, {message: msg});
            });
        }
    }).catch(done);
};

const signInFacebook = (accessToken, refreshToken, profile, done) => {
    const data = profile._json;
    return User.findOne({email: data.email}).then((user) => {
        if (user) {
            user.token = accessToken;
            user.lastLogin = new Date();
            return User.findOneAndUpdate({id: user.id}, user, {new: true}).then((updatedUser) => {
                const msg = `Customer with ID: ${updatedUser._id} was successfully signed in`;
                logger.info(msg);
                done(null, updatedUser, {message: msg});
            });
        } else {
            const newUser = {
                id: profile.id,
                provider: profile.provider.toUpperCase(),
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                profilePicture: data.picture.data.url,
                token: accessToken,
                emailVerified: true,
                lastLogin: new Date()
            };
            return User.create(newUser).then((newUser) => {
                const msg = `User with ID: ${newUser._id} was successfully signed up`;
                logger.info(msg);
                done(null, newUser, {message: msg});
            });
        }
    }).catch(done);
};

const signUpLocal = (req, email, password, done) => {
    return Customer.findOne({email: email}).then((user) => {
        if (user) {
            const msg = 'Username is already taken';
            logger.warn(msg);
            done(null, false, {message: msg});
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
                done(null, newUser, {message: msg});
            });
        }
    }).catch(done);
};

const verify = (jwtPayload, done) => {
    const msg = `Customer with ID: ${jwtPayload.id} was successfully verified`;
    logger.info(msg);
    done(null, jwtPayload, {message: msg});
};

module.exports = () => {
    passport.use('local-signIn', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, signInLocal));

    passport.use('facebook-signIn', new FacebookStrategy({
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: process.env.FB_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'photos', 'email', 'name'],
        enableProof: true
    }, signInFacebook));

    passport.use('local-signUp', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, signUpLocal));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    }, verify));
};
