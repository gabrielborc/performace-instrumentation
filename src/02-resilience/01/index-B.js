const express = require('express');
const requestPromise = require('request-promise');
const app = express();
const port = process.env.PORT || 3001;

async function requestRetry(retryCount = 0, maxRetryCount = 3) {

    const url = `http://localhost:${3000}/`;
    retryCount++;

    try {
        console.log(`Tentativas: ${retryCount}`);
        await requestPromise(url);
        console.log(`-------------------------`);
    } catch(err) {
        
        if (retryCount <= maxRetryCount) {
            return await requestRetry(retryCount, maxRetryCount);
        } else {
            throw err;
        }
    }
}

app.get('/retry', async (req, res) => {
    try {
        await requestRetry();
        res.send('OK')
    } catch (error) {
        res.status(500).send('Something broke!');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});