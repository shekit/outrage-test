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

	$(".show-ticker").on('click', function(event){
		event.preventDefault();
		socket.emit('show-ticker','yes')
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


	$(".show-team-match").on('click', function(event){
		event.preventDefault();
		socket.emit('show-team-match','yes')
	})

	$(".start-team-match").on('click', function(event){
		event.preventDefault();
		socket.emit('team-match', 'start')
	})

	$(".stop-team-match").on('click', function(event){
		event.preventDefault();
		socket.emit('team-match', 'stop');
	})


	$(".reset-screen").on('click', function(event){
		event.preventDefault();

		socket.emit('reset','yes')
	})
})