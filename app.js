var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var db;
if (process.env.ENV == 'Test') {
    db = mongoose.connect('mongodb://localhost/bookAPI_test', { useMongoClient: true });
} else {
    db = mongoose.connect('mongodb://localhost/bookAPI', { useMongoClient: true });
}

var bookRouter = require('./routes/bookRoutes')();

app.use('/api/books', bookRouter);
app.get('/', function (req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function () {
    console.log('Gulp is running my app on PORT: ' + port);
});

module.exports = app;