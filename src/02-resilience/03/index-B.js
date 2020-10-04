const express = require('express');
const got = require('got');
const CircuitBreaker = require('opossum')
const app = express();
const port = process.env.PORT || 3001;

const circuitBreakerOptions = {
    timeout: 5000,
    errorThresholdPercentage: 10,
    resetTimeout: 10000 
}

const breaker = new CircuitBreaker(requestWithRetry, circuitBreakerOptions);
breaker.on('open', () => console.log(`OPEN: The breaker`));
breaker.on('halfOpen', () => console.log(`HALF_OPEN: The breaker`));
breaker.on('close', () => console.log(`CLOSE: The breaker`));

breaker.fallback(() => console.log('called fallback'));

async function requestWithRetry() {
    const url = `http://localhost:${3000}/`;
    return got(url, { retry: 1 });
}

async function requestWithCb() {
    return breaker.fire();
}

app.get('/circuitbreaker', async (req, res) => {
    try {
        await requestWithCb();
        res.send('OK')
    } catch (error) {
        res.status(500).send('Something broke!');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});