$(document).ready(function(){
	
	var socket = io();

	var cyrus = $(".cyrus-score");
	var bieber = $(".bieber-score");

	var cyrusImage = $(".cyrus-img")
	var bieberImage = $(".bieber-img")

	var cyrusScore = 0;
	var bieberScore = 0;

	cyrus.text(cyrusScore);
	bieber.text(bieberScore);

	socket.on('bieber', function(msg){
		bieberScore++;
		bieber.text(bieberScore);
		shake(bieberImage);
	})

	socket.on('cyrus', function(msg){
		cyrusScore++;
		cyrus.text(cyrusScore);
		shake(cyrusImage);
	})

	function shake(div){                                                                                                                                                                                            
	    console.log("shake")                                                                       
		div.css({'bottom':'15px'});
		setTimeout(function(){
			div.css({'bottom':'0'})
		},100)
	}
})