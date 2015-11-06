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
})