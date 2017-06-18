// JavaScript Document
window.onload = function(){ 
	//
	var $progressbar = $('.progressbar');
	setTimeout(function(){
		$progressbar.css({
			'width'      :  200 ,
			'transition' : ' all 2s linear' 
		})
	},300)
	
	
	
	
  var mySwiper = new Swiper('.swiper-container',{
	speed:400,
	mode : 'vertical', 
	resistance:'100%',
	loop:false,
	mousewheelControl : true,
	grabCursor: true,
	pagination: '.pagination',
    paginationClickable: true,
	onFirstInit:function(){
		$('.slide1').addClass('ani-slide');
		},
	onSlideChangeEnd:function(swiper){
			console.log(swiper.activeIndex);
			//动态计算进度条的长度
			
			
		}
    })
  
    mySwiper.wrapperTransitionEnd(function () {//隐藏方法
		$('.ani-slide').removeClass('ani-slide')
		$('.swiper-slide').eq(mySwiper.activeIndex).addClass('ani-slide')
		},true);
	
	
	
  
		
}

 
function worksslide(){
	var center = $('.wrap-center')
	var  ul = $('.wrap-center > ul')
	
	var index = 1;
	var w =  -index*center.width()
	
	
	//定时器处理函数
      function handle (){
		
		ul.css({
			transform : 'translateX('+ w+'px)',
			transition : 'all .5s'
		})
	}
	
	
	var timer = setInterval(function(){
		index++
		handle()
	},1000)
}


