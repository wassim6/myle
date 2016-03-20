var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // express is an extremely minimalist framework so we need body-parser to help us handle req.body
var apiRouter = require('./app/config/routes'); // bring in API routes

// configure body-parser so we can work with request.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// pull correct settings per environment
var config = require('./app/config/config.js')
var environmentSettings = config.config();

// connect to DB which is on port 27017
mongoose.connect(environmentSettings.db);

// apply router middleware
// namespace your api
app.use('/api', apiRouter);

// serve static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/admin'));

// this is the entry way into the client-side
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

// this is the entry way into the admin-side
app.get('/admin', function(request, response) {
  response.sendFile(__dirname + '/admin/index.html');
});

// listen to port as defined or default 5000
var port = process.env.PORT || 5000;

app.listen(port);

console.log('Server is running on port', port);