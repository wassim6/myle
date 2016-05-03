var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser'); 
var http = require('http');
var io = require('socket.io');
var apiRouter = require('./app/config/routes'); // bring in API routes



//ss


/* socialLogin start */
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

//var configDB = require('.app/socialLogin/config/database.js');

// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our database
require('./app/socialLogin/passport.js')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true, limit:'50mb' }));
app.use(bodyParser.json({limit: '50mb'}));


app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/socialLogin/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch 
//app.listen(port);

/* socialLogin  end */



app.use(require('express-session')({

 secret: 'keyboard cat',

 resave: false,

 saveUninitialized: false

}));
app.use(passport.initialize());
app.use(passport.session());
var Account = require('./app/models/Account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
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


var server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent');

app.get('/c', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });
    socket.on('message', function (message) {
        //message = ent.encode(message);
        message = message;
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    }); 
});

server.listen(8081);



app.listen(port);

// social login port
console.log('social login is running on port', port);

console.log('Server is running on port', port);