'use strict';
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
            const [user] = await getUserLogin(params);
            console.log('Local strategy', user); // result is binary row
            const unvalid = 'invalid credentials';
            if (user === undefined) {
                return done(null, false, { message: unvalid });
            }
            const correctPwd = await bcrypt.compare(password, user.password);
            if (!correctPwd) {
                return done(null, false, { message: unvalid });
            }
            const userNoPwd = { ...user };
            delete userNoPwd.password;
            return done(null, userNoPwd, { message: 'Logged In Successfully' }); // use spread syntax to create shallow copy to get rid of binary row type
        } catch (err) {
            return done(err);
        }
    }));

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    (jwtPayload, done) => {
        console.log('JWT payload content', jwtPayload);
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        if (jwtPayload !== undefined) {
            return done(null, jwtPayload);
        } else {
            return done(null, { error: "something went wrong" });
        }
    }
));

module.exports = passport;
