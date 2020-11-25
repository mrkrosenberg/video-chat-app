const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');



exports.helloWorld = functions.https.onRequest((req, res) => {
    res.send('good news everyone!')
});

const { testFunction } = require('./handlers/test');

app.get('/api', testFunction);

exports.api = functions.https.onRequest(app);