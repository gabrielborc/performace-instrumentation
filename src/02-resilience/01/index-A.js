const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

function getRandom(min=0, max=1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * ())
}