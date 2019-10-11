"use strict"

const express = require('express')
const app = express()
const handler = require('./handler')
const bodyParser = require('body-parser')
const formidableMiddleware = require('express-formidable');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '10000mb'}));
app.use(bodyParser.raw({limit: '10000mb'}));
app.use(bodyParser.text({ type : "text/*", limit: '10000mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '10000mb'}))
app.use(formidableMiddleware({maxFileSize: 10000 * 1024 * 1024, multiples: true}))
app.disable('x-powered-by');

var middleware = (req, res, next) => {
    handler(req, res, next);
};

app.post('/*', middleware);
app.get('/*', middleware);
app.patch('/*', middleware);
app.put('/*', middleware);
app.delete('/*', middleware);

const port = process.env.http_port || 3000;

app.listen(port, () => {
    console.log(`OpenFaaS Node.js listening on port: ${port}`)
});
