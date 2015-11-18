var express = require('express');
var socket_io = require('socket.io')
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var Twit = require('twit');
var TwitterStreamChannels = require('twitter-stream-channels');

var match = false;
var team_match = false;

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


// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

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


var credentials = {
	consumer_key: 'OSH9zEYe90ew8QSy0RcchedIx',
	consumer_secret: 'XIqSRziiAut6RNgkhEdskf0SFTeKpDaA4fehWaREXn7FkbsPOZ',
	access_token: '1319028200-zkM399rPAjx8MIn7HmMGqAYD1Ym6aNYCUUlsUrp',
	access_token_secret: '5QHtfe2T2N1hoEVJ4Cl4EsSR22OfCFVdxa8AxJ2OcpmHd'
}

var client = new TwitterStreamChannels(credentials)

var channels = {
	"bieber": ['bieber', 'justin bieber'],
	"kim":["redcup","starbucks"],
	"aj":["bieber"],
	"reb":["keystone"],
	"abhi":["trump"]
}

var stream = client.streamChannels({track:channels});


stream.on('channels/bieber', function(tweet){
	if(match){
		io.emit('bieber','yes');
		console.log('BIEBER');
	}
	
})

stream.on('channels/kim', function(tweet){
	if(match){
		io.emit('cyrus', 'yes');
		console.log('CYRUS')
	}
})

stream.on('channels/aj', function(tweet){
	if(team_match){
		io.emit('aj','yes');
		console.log('AJ');
	}
	
})

stream.on('channels/reb', function(tweet){
	if(team_match){
		io.emit('reb', 'yes');
		console.log('REB')
	}
})

stream.on('channels/abhi', function(tweet){
	if(team_match){
		io.emit('abhi', 'yes');
		console.log('ABHI')
	}
})




io.on('connection', function(socket){
	console.log('a user connected');

	socket.on('show-pic', function(msg){
		console.log('show team pic')
		socket.broadcast.emit('show-pic','yes')
	})

	socket.on('show-text', function(msg){
		console.log('show text');
		socket.broadcast.emit('show-text', 'yes')
	})

	socket.on('show-ticker', function(msg){
		console.log('show-ticker');
		socket.broadcast.emit('show-ticker','yes')
	})

	socket.on('show-match', function(msg){
		console.log('show match')
		socket.broadcast.emit('show-match','yes')
	})

	socket.on('match', function(msg){
		
		if(msg == 'start'){
			console.log('start the match')
			match = true;
			stream.start();
		} else {
			console.log('stop the match')
			match = false;
			stream.stop();
		}
	})

	socket.on('show-team-match', function(msg){
		console.log('show team match')
		socket.broadcast.emit('show-team-match','yes')
	})

	socket.on('team-match', function(msg){
		
		if(msg == 'start'){
			console.log('start the team match')
			team_match = true;
			stream.start();
		} else {
			console.log('stop the team match')
			team_match = false;
			stream.stop();
		}
	})

	socket.on('reset', function(msg){
		console.log('reset the screen')
		socket.broadcast.emit('reset','yes')
	})

	socket.on('disconnect', function(){
		console.log('a user disconnected');
		
	})
})


module.exports = app;
