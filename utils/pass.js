'use strict';

// Source: https://github.com/patrick-ausderau/wop
// Creating variables for node modules and other requirements.

require('dotenv').config();
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUserLogin, getUser } = require('../models/userModel');
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// local strategy for username password login
passport.use(new Strategy(
    async (email, password, done) => {
        const params = [email];
        try {
            // Get user login
            const [user] = await getUserLogin(params);
            console.log('Local strategy', user); // result is binary row
            const unvalid = 'invalid credentials';
            if (user === undefined) {
                // If user is undefined
                return done(null, false, { message: unvalid });
            }
            const correctPwd = await bcrypt.compare(password, user.password);
            if (!correctPwd) {
                // If password won't match login is failing
                return done(null, false, { message: unvalid });
            }

            // Removes password from user before returning or displaying it
            const userNoPwd = { ...user };
            delete userNoPwd.password;
            // Returns user without password
            return done(null, userNoPwd, { message: 'Logged In Successfully' }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    }));

// JWT strategy for handling bearer token
// using .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    (jwtPayload, done) => {
        // Displays payload content
        console.log('JWT payload content', jwtPayload);
        // finds the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        if (jwtPayload !== undefined) {
            return done(null, jwtPayload);
        } else {
            return done(null, { error: "something went wrong" });
        }
    }
));

// Export passport
module.exports = passport;
