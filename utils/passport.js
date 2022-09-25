const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oidc');
const config = require('../config');
const prisma = require('../prisma_client');

passport.use(new FacebookStrategy({
    clientID: config.fb_app_id,
    clientSecret: config.fb_app_secret,
    callbackURL: `http://localhost:${config.port}/auth/login/facebook`
},
    async function (accessToken, refreshToken, profile, cb) {
        try {
            let user = await prisma.user.findUnique({
                where: {
                    facebookId: profile.id
                }
            });
            if (!user) {
                data = {
                    facebookId: profile.id,
                    firstName: profile.displayName.split(" ")[0],
                    lastName: profile.displayName.split(" ")[1],
                };
                user = await prisma.user.create({
                    data: data
                });
            }
            return cb(null, user);
        } catch (err) {
            cb(err)
        }
    }
));

passport.use(new GoogleStrategy({
    clientID: config.google_app_id,
    clientSecret: config.google_app_secret,
    callbackURL: `http://localhost:${config.port}/auth/login/google`,
    scope: ['profile']
},
    async function (issuer, profile, cb) {
        try {
            let user = await prisma.user.findUnique({
                where: {
                    googleId: profile.id
                }
            });
            if (!user) {
                data = {
                    googleId: profile.id,
                    firstName: profile.displayName.split(" ")[0],
                    lastName: profile.displayName.split(" ")[1],
                };
                user = await prisma.user.create({
                    data: data
                });
            }
            return cb(null, user);
        } catch (err) {
            cb(err)
        }
    }
));


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

module.exports = passport;