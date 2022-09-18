const createError = require('http-errors');

const express = require('express');
const app = express();


app.get('/', async (req, res) => {
    res.send({ message: "Everything works." });
});


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