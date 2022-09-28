const config = require('./config');

const createError = require('http-errors');
const session = require('express-session');
const passport = require('./utils/passport');
const express = require('express');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const searchsRouter = require('./routes/searchs');
const postsRouter = require('./routes/posts');
const { restart } = require('nodemon');

const app = express();

app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', async (req, res, next) => {
    try {
        res.status(200).json({
            status: 200,
            data: {
                message: (config.env == 'development') ? "I'm working" : "I'm simple social media backend API"
            }
        })
    } catch (err) {
        next(err);
    }
});

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/searchs', searchsRouter);
app.use('/posts', postsRouter);

app.use((req, res, next) => {
    next(createError.NotFound());
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message
    });
});

module.exports = app;