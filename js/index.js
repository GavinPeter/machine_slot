/*
*
*	jQuery Slot Machine
*
*/
var height_slot_number = '150';

var lottoArr = new Array();

function sort(){

	lottoArr.sort(function(a, b){return a-b});

	$('.lottery').empty();
	
	lottoArr.forEach(function( element, index, array){
		$('.lottery').append('<li class="lottery-ball">' + element + '</li>');	
		
	});
}

function go(hundreds,tens,units){
	
	var lottoNum =  (tens*10+units);

  	//prevent 000 case and bigger 70  then re-spin
  	if (( lottoNum>75)||(tens==0&&units==0)||(lottoArr.indexOf(lottoNum)!=-1)){
    		 go( 0,Math.floor(Math.random() * 10),Math.floor(Math.random() * 10));    
  	}	
	else{
  
	addSlots($("#slots_units .number-wrapper"));
	addSlots($("#slots_units .number-wrapper"));
	moveSlots($("#slots_units .number-wrapper"),units);
	addSlots($("#slots_tens .number-wrapper"));
	addSlots($("#slots_tens .number-wrapper"));
	moveSlots($("#slots_tens .number-wrapper"),tens);
  	addSlots($("#slots_hundreds .number-wrapper"));
	addSlots($("#slots_hundreds .number-wrapper"));
	moveSlots($("#slots_hundreds .number-wrapper"),hundreds);

	lottoArr.push(lottoNum );

    setTimeout( function() { $('.lottery').append('<li class="lottery-ball">' + lottoNum + '</li>');} , 4000);
	}
}

function addSlots(jqo){
	for(var i = 0; i < 10; i++){
		jqo.append("<div class='slot'>"+ i +"</div>");
	}
}

function moveSlots(jqo,num){
	var time	= 6500;
	var number	= num;
	time		+= Math.round(Math.random()*1000);
	jqo.stop(true,true);

	var num_slot    = Math.round((jqo.find('.slot').length)/20);
	var margin_top  = ((num_slot -1) * (height_slot_number * 10)) + (num * height_slot_number);

	jqo.animate(
		{"margin-top":"-"+ margin_top +"px"},
		{'duration' : time, 'easing' : "easeOutElastic"}
	);
}

$(document).ready(function(){
             var audio = new Audio('sound1.ogg');
    
		addSlots($("#slots_units .number-wrapper"));
		addSlots($("#slots_tens .number-wrapper"));
		addSlots($("#slots_hundreds .number-wrapper"));
    $('#arm').click(function(e) {
       audio.play();
        
		var arm = $(this).addClass('clicked');
		delay = setTimeout(function() { arm.removeClass('clicked');}, 500);
		e.preventDefault();
		go( 0,Math.floor(Math.random() * 10),Math.floor(Math.random() * 10));
	  });
    
    //love background 
	//thank for http://www.thelittletechie.com/2015/03/love-heart-animation-using-css3.html
	var love = setInterval(function() {
		var r_num = Math.floor(Math.random() * 40) + 1;
		var r_size = Math.floor(Math.random() * 65) + 10;
		var r_left = Math.floor(Math.random() * 100) + 1;
		var r_bg = Math.floor(Math.random() * 25) + 100;
		var r_time = Math.floor(Math.random() * 5) + 5;

		$('.bg_heart').append("<div class='heart' style='width:" + r_size + "px;height:" + r_size + "px;left:" + r_left + "%;background:rgba(255," + (r_bg - 25) + "," + r_bg + ",1);-webkit-animation:love " + r_time + "s ease;-moz-animation:love " + r_time + "s ease;-ms-animation:love " + r_time + "s ease;animation:love " + r_time + "s ease'></div>");

		$('.bg_heart').append("<div class='heart' style='width:" + (r_size - 10) + "px;height:" + (r_size - 10) + "px;left:" + (r_left + r_num) + "%;background:rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1);-webkit-animation:love " + (r_time + 5) + "s ease;-moz-animation:love " + (r_time + 5) + "s ease;-ms-animation:love " + (r_time + 5) + "s ease;animation:love " + (r_time + 5) + "s ease'></div>");

		$('.heart').each(function() {
			var top = $(this).css("top").replace(/[^-\d\.]/g, '');
			var width = $(this).css("width").replace(/[^-\d\.]/g, '');
			if (top <= -100 || width >= 150) {
				$(this).detach();
			}
		});
	}, 600);
});
