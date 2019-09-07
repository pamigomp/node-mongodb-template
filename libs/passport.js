'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const logger = require('./logger');
const Customer = require('../app/models/customer');
const Employee = require('../app/models/employee');
const User = require('../app/models/user');

const signUpCustomerLocal = (req, email, password, done) => {
    return Customer.findOne({email: email}).then((customer) => {
        if (customer) {
            const msg = 'E-mail is already taken';
            logger.warn(msg);
            done(null, false, {message: msg});
        } else {
            const newCustomer = {
                email: email,
                password: password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                lastLogin: new Date()
            };
            return Customer.create(newCustomer).then((newCustomer) => {
                const msg = `Customer with ID: ${newCustomer._id} was successfully signed up`;
                logger.info(msg);
                done(null, newCustomer, {message: msg});
            });
        }
    }).catch(done);
};

const signInCustomerLocal = (email, password, done) => {
    return Customer.findOne({email: email}).then((customer) => {
        if (!customer || !customer.validatePassword(password)) {
            const msg = 'E-mail and/or password is invalid';
            logger.warn(msg);
            done(null, false, {message: msg});
        } else {
            customer.lastLogin = new Date();
            return Customer.findByIdAndUpdate(customer._id, customer, {new: true}).then((updatedCustomer) => {
                const msg = `Customer with ID: ${updatedCustomer._id} was successfully signed in`;
                logger.info(msg);
                done(null, updatedCustomer, {message: msg});
            });
        }
    }).catch(done);
};

const signUpEmployeeLocal = (req, username, password, done) => {
    return Employee.findOne({username: username}).then((employee) => {
        if (employee) {
            const msg = 'Username is already taken';
            logger.warn(msg);
            done(null, false, {message: msg});
        } else {
            const newEmployee = {
                username: username,
                password: password,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                dob: req.body.dob,
                street: req.body.street,
                postalCode: req.body.postalCode,
                city: req.body.city,
                phone: req.body.phone,
                email: req.body.email,
                employmentDate: req.body.employmentDate,
                positionId: req.body.positionId,
                lastLogin: new Date()
            };
            return Employee.create(newEmployee).then((newEmployee) => {
                const msg = `Employee with ID: ${newEmployee._id} was successfully signed up`;
                logger.info(msg);
                done(null, newEmployee, {message: msg});
            });
        }
    }).catch(done);
};

const signInEmployeeLocal = (username, password, done) => {
    return Employee.findOne({username: username}).then((employee) => {
        if (!employee || !employee.validatePassword(password)) {
            const msg = 'Username and/or password is invalid';
            logger.warn(msg);
            done(null, false, {message: msg});
        } else {
            employee.lastLogin = new Date();
            return Employee.findByIdAndUpdate(employee._id, employee, {new: true}).then((updatedEmployee) => {
                const msg = `Employee with ID: ${updatedEmployee._id} was successfully signed in`;
                logger.info(msg);
                done(null, updatedEmployee, {message: msg});
            });
        }
    }).catch(done);
};

const signInCustomerFacebook = (accessToken, refreshToken, profile, done) => {
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

const verify = (jwtPayload, done) => {
    let msg = null;
    if (jwtPayload.role === 'Admin') {
        msg = `Employee with ID: ${jwtPayload.id} was successfully verified`;
    } else {
        msg = `Customer/User with ID: ${jwtPayload.id} was successfully verified`;
    }
    logger.info(msg);
    done(null, jwtPayload, {message: msg});
};

module.exports = () => {
    passport.use('signUp-customer-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, signUpCustomerLocal));

    passport.use('signIn-customer-local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, signInCustomerLocal));

    passport.use('signUp-employee-local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, signUpEmployeeLocal));

    passport.use('signIn-employee-local', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, signInEmployeeLocal));

    passport.use('signIn-customer-facebook', new FacebookStrategy({
        clientID: process.env.FB_APP_ID,
        clientSecret: process.env.FB_APP_SECRET,
        callbackURL: process.env.FB_CALLBACK_URL,
        profileFields: ['id', 'displayName', 'photos', 'email', 'name'],
        enableProof: true
    }, signInCustomerFacebook));

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.SECRET_KEY
    }, verify));
};
