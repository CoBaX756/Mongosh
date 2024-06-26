const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const apiRoutes = require('./api');
//const cors = require('cors');

let app = express();


/** 
app.use(cors({
    origin: ['http://localhost:8080', 'http://127.0.0.1:8080', 'http://playalmi.duckdns.org:8080', 'http://18.215.6.232:8080', 'http://playalmi.duckdns.org']
}));
*/

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



mongoose.connect('mongodb://localhost/Netalmix', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
if (!db) {
    console.log("ERROR connecting db");
} else {
    console.log("DB connected successfully");
}

var port = process.env.port || 8080;

app.get('/info', (req, res) => res.send('El mejor WS de la historia'));

app.listen(port, function () {
    console.log("Running on port: " + port);
});

app.use('/', apiRoutes);

