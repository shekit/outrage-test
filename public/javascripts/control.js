$(document).ready(function(){

	var socket = io();

	$(".show-pic").on('click', function(event){
		event.preventDefault();

		socket.emit('show-pic', 'yes')
	})

	$(".reset-screen").on('click', function(event){
		event.preventDefault();

		socket.emit('reset','yes')
	})

	$(".show-text").on('click', function(event){
		event.preventDefault();
		socket.emit('show-text', 'yes')
	})

	$(".start-match").on('click', function(event){
		event.preventDefault();
		socket.emit('match', 'start')
	})

	$(".stop-match").on('click', function(event){
		event.preventDefault();
		socket.emit('match', 'stop');
	})
})