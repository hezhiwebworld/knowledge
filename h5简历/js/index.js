

//产生随机的小点

	snowDrop(150, randomInt(1035, 1280));
	snow(150, 150);
	setInterval(function(){
		remonvesnow()
	},20)


function snow(num, speed) {
	if (num > 0) {
		setTimeout(function () {
			$('#drop_' + randomInt(1, 250)).addClass('animate');
			num--;
			snow(num, speed);
		}, speed);
	}
};

function snowDrop(num, position) {
	if (num > 0) {
		var drop = '<div class="drop snow" id="drop_' + num + '"></div>';

		$('.swiper-slide').append(drop);
		$('#drop_' + num).css('left', position);
		num--;
		snowDrop(num, randomInt(60, 1280));
	}
};

function randomInt(min, max) {
	return Math.floor( Math.random() * (max - min + 1) + min );
};

function remonvesnow(){
	var snow = document.querySelectorAll('.snow')
	for (var i =0; i<snow.length;i++) {
		if(snow[i].offsetTop >600){
			snow[i].remove()
		}
	}
}


$(function(){
	 worksslide();
	 
	 function worksslide(){
		var center = $('.wrap-center')
		var  ul = $('.wrap-center > ul')
		var  lis = $('.wrap-center > ul >li')
		var index = 1;
		var w = center.width()
		
		var color = $('.shadow-color')
		var arr = ['green','olive','red','blue','pink','yellow'];
		
		//定时器处理函数
	      function handle (){
			
			var x = -index*w
			
			ul.css({
				transform : 'translateX('+ x+'px)',
				transition : 'all .5s'
			})
		}
		
		
		var timer = setInterval(function(){
			index++;
			handle()
		},1000)
		
		ul.on('transitionend',function(){
			if( index >= lis.length-1){
				index = 1
				
				x = -index*w
				
				ul.css({
					transform : 'translateX('+ x+'px)',
					transition : 'none'
				})
			}else if(index <= 0){
				index = lis.length-1
				
				x = -index*w
				
				ul.css({
					transform : 'translateX('+ x+'px)',
					transition : 'none'
				})
			}
			color.css('background',arr[index])
			
		})
		
	}

})


$(function(){
	 worksslideleft();
	 
	 function worksslideleft(){
		var center = $('.wrap-left')
		var  ul = $('.wrap-left > ul')
		var  lis = $('.wrap-left > ul >li')
		var index = 1;
		var w = center.width()
		
		
		//定时器处理函数
	      function handle (){
			
			var x = -index*w
			
			ul.css({
				transform : 'translateX('+ x+'px)',
				transition : 'all .5s'
			})
		}
		
		
		var timer = setInterval(function(){
			index++;
			handle()
		},1000)
		
		ul.on('transitionend',function(){
			if( index >= lis.length-1){
				index = 1
				
				x = -index*w
				
				ul.css({
					transform : 'translateX('+ x+'px)',
					transition : 'none'
				})
			}else if(index <= 0){
				index = lis.length-1
				
				x = -index*w
				
				ul.css({
					transform : 'translateX('+ x+'px)',
					transition : 'none'
				})
			}
			
			
		})
		
	}

})



$(function(){
	 worksslideright();
	 
	 function  worksslideright(){
		var center = $('.wrap-right')
		var  ul = $('.wrap-right > ul')
		var  lis = $('.wrap-right > ul >li')
		var index = 1;
		var w = center.width()
		
		
		//定时器处理函数
	      function handle (){
			
			var x = -index*w
			
			ul.css({
				transform : 'translateX('+ x+'px)',
				transition : 'all .5s'
			})
		}
		
		
		var timer = setInterval(function(){
			index++;
			handle()
		},1000)
		
		ul.on('transitionend',function(){
			if( index >= lis.length-1){
				index = 1
				
				x = -index*w
				
				ul.css({
					transform : 'translateX('+ x+'px)',
					transition : 'none'
				})
			}else if(index <= 0){
				index = lis.length-1
				
				x = -index*w
				
				ul.css({
					transform : 'translateX('+ x+'px)',
					transition : 'none'
				})
			}
			
			
		})
		
	}

})


$(function(){
	
	$('.btn-item').eq(0).on('click',function(){
	    $('.circle').removeClass('cir cir1 cir2 cir3 cir4 cir5')
		$('.circle').addClass('cir1')
	})
	
	$('.btn-item').eq(1).on('click',function(){
		$('.circle').removeClass('cir cir1 cir2 cir3 cir4 cir5')
		$('.circle').addClass('cir2')
	})
	
	$('.btn-item').eq(2).on('click',function(){
		$('.circle').removeClass('cir cir1 cir2 cir3 cir4 cir5')
		$('.circle').addClass('cir3')
	})
	$('.btn-item').eq(3).on('click',function(){
		$('.circle').removeClass('cir cir1 cir2 cir3 cir4 cir5')
		$('.circle').addClass('cir4')
	})
	$('.btn-item').eq(4).on('click',function(){
		$('.circle').removeClass('cir cir1 cir2 cir3 cir4 cir5')
		$('.circle').addClass('cir5')
	})
	$('.btn-item').eq(6).on('click',function(){
		$('.circle').removeClass('cir cir1 cir2 cir3 cir4 cir5')
		$('.circle').addClass('cir')
	})

	
})

