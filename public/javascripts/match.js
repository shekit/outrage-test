$(document).ready(function(){
	
	var socket = io();

	var miley = $(".miley-score");
	var bieber = $(".bieber-score");

	var mileyScore = 0;
	var bieberScore = 0;

	miley.text(mileyScore);
	bieber.text(bieberScore);

	socket.on('bieber', function(msg){
		bieberScore++;
		bieber.text(bieberScore);
	})

	socket.on('cyrus', function(msg){
		mileyScore++;
		miley.text(mileyScore);
	})
})