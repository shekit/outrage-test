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
		$("#hammerWrapper").hide()
		$("#textWrapper").hide()
		$("#matchWrapper").hide()
		$("#tickerWrapper").hide()
		$("#teamWrapper").fadeIn(200);
	})

	socket.on('show-text', function(msg){
		console.log('show text')
		$("#hammerWrapper").hide()
		$("#textWrapper").fadeIn(200)
		$("#matchWrapper").hide()
		$("#tickerWrapper").hide()
		$("#teamWrapper").hide();
	})

	socket.on('show-match', function(msg){
		console.log('show match')
		$("#hammerWrapper").hide()
		$("#textWrapper").hide()
		$("#matchWrapper").fadeIn(200)
		$("#tickerWrapper").hide()
		$("#teamWrapper").hide();
	})

	socket.on('show-ticker', function(msg){
		console.log('show ticker')
		$("#hammerWrapper").hide()
		$("#textWrapper").hide()
		$("#matchWrapper").hide()
		$("#tickerWrapper").fadeIn(200)
		$("#teamWrapper").hide();
	})

	socket.on('reset', function(msg){
		location.reload();
	})

	

	/////// MATCH UP //////////
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