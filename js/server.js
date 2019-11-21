const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('./'));

app.get('/goods', (req, res) => {
    fs.readFile('./catalog.json', 'utf-8', (err, data) => {
        res.send(data);
    })
});

app.get('/cart', (req, res) => {
    fs.readFile('./basket.json', 'utf-8', (err, data) => {
        res.send(data);
    })
});

app.listen(3014);