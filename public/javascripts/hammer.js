$(document).ready(function(){

	var count = -1;
	var animateFunction;
	var colors = ["red","#fbb040","#f7941e","#f16b2b","#ed1c24"];

	var socket = io();

	setTimeout(function(){
		$(".img-center").fadeOut(400);
		$(".high-striker").fadeIn(800);
		$(".panel1, .panel2, .panel3, .panel4").fadeIn(800);
		setTimeout(function(){
			animate();
		},900)
	}, 1500)

	function animate(){
		animateFunction = setInterval(function(){
		++count;
		if(count>4){
			count = 0;
			resetColors();
		}
		$(".panel"+count).css({'background':colors[count]})
		},400)
	}
	

	function resetColors(){
		for(var i=0;i<=4;i++){
			$(".panel"+i).css({'background':'#ffffff'})
		}
	}

	function reset(){
		resetColors();
		clearInterval(animateFunction);
	}

	socket.on('show-pic', function(msg){
		console.log('team pic')
	})

	socket.on('reset', function(msg){
		location.reload();
	})

})