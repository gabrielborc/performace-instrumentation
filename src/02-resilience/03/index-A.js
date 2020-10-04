const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.info('OK');
    res.send('OK');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost${port}`);
});