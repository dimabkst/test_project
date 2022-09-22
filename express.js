const createError = require('http-errors');
const express = require('express');

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();


app.use(express.json());


app.get('/', async (req, res) => {
    res.send({ message: "Everything works." });
});


app.use('/users', usersRouter);
app.use('/', authRouter);


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