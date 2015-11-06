$(document).ready(function(){

	var socket = io();

	$(".show-pic").on('click', function(event){
		event.preventDefault();

		socket.emit('show-pic', 'yes')
	})

	$(".show-text").on('click', function(event){
		event.preventDefault();
		socket.emit('show-text', 'yes')
	})

	$(".show-match").on('click', function(event){
		event.preventDefault();
		socket.emit('show-match','yes')
	})

	$(".start-match").on('click', function(event){
		event.preventDefault();
		socket.emit('match', 'start')
	})

	$(".stop-match").on('click', function(event){
		event.preventDefault();
		socket.emit('match', 'stop');
	})

	$(".reset-screen").on('click', function(event){
		event.preventDefault();

		socket.emit('reset','yes')
	})
})