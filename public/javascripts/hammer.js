$(document).ready(function(){

	var count = -1;
	var animateFunction;
	var colors = ["#fbb040","#f7941e","#f16b2b","#ed1c24"];


	setTimeout(function(){
		$(".img-center").fadeOut(400);
		$(".high-striker").fadeIn(800);
		$(".panel0, .panel1, .panel2, .panel3").fadeIn(800);
		setTimeout(function(){
			animate();
		},900)
	}, 1500)

	function animate(){
		animateFunction = setInterval(function(){
		++count;
		if(count>3){
			count = 0;
			resetColors();
		}
		$(".panel"+count).css({'background':colors[count]})

		console.log(count)
		},400)
	}
	

	function resetColors(){
		for(var i=0;i<=3;i++){
			$(".panel"+i).css({'background':'#ffffff'})
		}
	}

})