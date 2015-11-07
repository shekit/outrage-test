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
		$("#teamMatchWrapper").hide();
	})

	socket.on('show-text', function(msg){
		console.log('show text')
		$("#hammerWrapper").hide()
		$("#textWrapper").fadeIn(200)
		$("#matchWrapper").hide()
		$("#tickerWrapper").hide()
		$("#teamWrapper").hide();
		$("#teamMatchWrapper").hide();
	})

	socket.on('show-match', function(msg){
		console.log('show match')
		$("#hammerWrapper").hide()
		$("#textWrapper").hide()
		$("#matchWrapper").fadeIn(200)
		$("#tickerWrapper").hide()
		$("#teamWrapper").hide();
		$("#teamMatchWrapper").hide();
	})

	socket.on('show-team-match', function(msg){
		console.log('show team match')
		$("#hammerWrapper").hide()
		$("#textWrapper").hide()
		$("#matchWrapper").hide()
		$("#tickerWrapper").hide()
		$("#teamWrapper").hide();
		$("#teamMatchWrapper").fadeIn(200);
	})

	socket.on('show-ticker', function(msg){
		console.log('show ticker')
		$("#hammerWrapper").hide()
		$("#textWrapper").hide()
		$("#matchWrapper").hide()
		$("#tickerWrapper").fadeIn(200)
		$("#teamWrapper").hide();
		$("#teamMatchWrapper").hide();
		var imgCount = 0
		setInterval(function(){
			imgCount++;
			if(imgCount>2){
				imgCount = 1;
				$(".pic2").fadeOut();
			}
			$(".pic"+imgCount).fadeIn()
			console.log(imgCount)
		},1500)
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

	/////// TEAM MATCH UP //////////
	var aj = $(".aj-score");
	var reb = $(".reb-score");
	var abhi = $(".abhi-score");

	var ajImage = $(".aj-img")
	var rebImage = $(".reb-img")
	var abhiImage = $(".abhi-img")

	var ajScore = 0;
	var rebScore = 0;
	var abhiScore = 0;

	aj.text(ajScore);
	reb.text(rebScore);
	abhi.text(abhiScore)

	socket.on('aj', function(msg){
		ajScore++;
		aj.text(ajScore);
		shake(ajImage);
	})

	socket.on('reb', function(msg){
		rebScore++;
		reb.text(rebScore);
		shake(rebImage);
	})

	socket.on('abhi', function(msg){
		abhiScore++;
		abhi.text(abhiScore);
		shake(abhiImage);
	})



})