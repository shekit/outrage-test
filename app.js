var express = require('express');
var socket_io = require('socket.io')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var Twit = require('twit')

var match = false;

var app = express();

var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

///////////// TWITTER /////////////////

var client = new Twit({
	consumer_key: 'OSH9zEYe90ew8QSy0RcchedIx',
	consumer_secret: 'XIqSRziiAut6RNgkhEdskf0SFTeKpDaA4fehWaREXn7FkbsPOZ',
	access_token: '1319028200-zkM399rPAjx8MIn7HmMGqAYD1Ym6aNYCUUlsUrp',
	access_token_secret: '5QHtfe2T2N1hoEVJ4Cl4EsSR22OfCFVdxa8AxJ2OcpmHd'
});


var bieberStream = client.stream('statuses/filter', {track: 'bieber', language: 'en'});
var cyrusStream = client.stream('statuses/filter', {track: 'cyrus', language: 'en'})


bieberStream.on('tweet', function(tweet){
	io.emit('bieber','yes');
	console.log('BIEBER')
});

cyrusStream.on('tweet', function(tweet){
	io.emit('cyrus', 'yes');
	console.log('CYRUS')
})


io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('show-pic', function(msg){
		console.log('show team pic')
		socket.broadcast.emit('show-pic','yes')
	})

	socket.on('reset', function(msg){
		console.log('reset the screen')
		socket.broadcast.emit('reset','yes')
	})

	socket.on('show-text', function(msg){
		console.log('show text');
		socket.broadcast.emit('show-text', 'yes')
	})

	socket.on('match', function(msg){
		console.log('start the match')
	})

	socket.on('disconnect', function(){
		console.log('a user disconnected');
	})
})


module.exports = app;
