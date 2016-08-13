$(document).ready(function(){
	var slider_last = null;
	var slider_now_el = $(".slider .slider_scrol .slide");
	var slider_now_numb = 1;
	var can_scrol = 1;

	function go_slider_1_slide(n, animate) {
		
			var slider_1_el = $('.slider_base .slide');
			if(slider_1_el.length < 2 || n >slider_1_el.length || n<1 || slider_now_numb == n || !can_scrol)
				return;

			var width = parseInt($('.slider').css('width'));

			if(slider_last == null){
				$($('.slider_base .slide')[n-1]).clone().appendTo($(".slider .slider_scrol"));
				 $($('.slider_base .slide')[slider_now_numb-1]).replaceWith($($(".slider .slider_scrol .slide")[0]).clone());
				 slider_last = slider_now_el;
				 slider_now_el = $(".slider .slider_scrol .slide")[1];
				 slider_now_numb = n;
				 if(animate){
				 can_scrol = 0;
				$('.slider_scrol').animate({left: -width}, 400,(function(){               
				 can_scrol = 1;
	            }) );}else{
					 $('.slider_scrol').css('left',-width);
	            }
			}else{
				$($('.slider_base .slide')[n-1]).clone().appendTo($(".slider .slider_scrol"));
				 $($('.slider_base .slide')[slider_now_numb-1]).replaceWith($($(".slider .slider_scrol .slide")[1]).clone());
				 slider_last = slider_now_el;
				 slider_now_el = $(".slider .slider_scrol .slide")[1];
				 slider_now_numb = n;
				 if(animate){
				 can_scrol = 0;
				$($(".slider .slider_scrol .slide")[0]).animate({width: 0}, 400, (function(){
	                $(this).detach();
				 can_scrol = 1;
	            }));}else{
					 $($(".slider .slider_scrol .slide")[0]).detach();
	            }
				
		}
			
	}

	function go_to_slider(n) {
		if($('.slider .vertical_scrol').css('top') == '0px' && n != 'none'){
			go_slider_1_slide(n, 1);
			return;
		}
			$('.slider .vertical_scrol').animate({top: 0}, 400 );
			if(n != 'none')
				go_slider_1_slide(n,0);
	}
	function go_to_player() {
			$('.slider .vertical_scrol').animate({top: -parseInt($('.slider').css('height'))}, 400 );
	}
















	$('#go_slider_1_slide_1').click(function(){
		go_to_slider(1);
	})
	$('#go_slider_1_slide_2').click(function(){
		go_to_slider(2);
	})
	$('#go_slider_1_slide_3').click(function(){
		go_to_slider(3);
	})
	$('#go_slider_1_slide_4').click(function(){
		go_to_slider(4);
	})
	$('#go_slider_Slider_1').click(function(){
		go_to_slider(1);
	})
	$('#go_slider_Slider_4').click(function(){
		go_to_slider(4);
	})
		$('#go_slider_Slider_none').click(function(){
		go_to_slider('none');
	})
	$('#go_slider_Player').click(function(){
		go_to_player();
	})
});