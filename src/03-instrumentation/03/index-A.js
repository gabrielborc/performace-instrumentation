require('dotenv').config();
process.env.APP_NAME = "index-A";

const log = require('./log');
const newrelic = require('newrelic')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    log.info('OK');
    res.json({ message: 'OK' });
});

app.get('/error', (req, res) => {
    log.error('Something broke!');
    res.status(500).send({ error: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost${port}`);
});