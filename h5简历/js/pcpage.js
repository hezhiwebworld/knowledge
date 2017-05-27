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
			
			$progressbar.css({
					'width'      : swiper.activeIndex*200 + 200 + 'px',
					'transition' : ' all 2s linear' 
			})
		}
    })
  
mySwiper.wrapperTransitionEnd(function () {//隐藏方法
	$('.ani-slide').removeClass('ani-slide')
	$('.swiper-slide').eq(mySwiper.activeIndex).addClass('ani-slide')
	},true);
	
	
	
//专业技能动画

	//绘出棋盘
	var can = document.getElementById('can');
	var ctx =  can.getContext('2d');
	
	ctx.strokeStyle = "#000";
	
	for (var i=0;i<15;i++) {
		for (var j=0;j<20;j++) {
			ctx.strokeRect(j*40,i*40,40,40)
		}
	}
		//棋子
		var mao = new Image();
		
		
		
		
		
		
		var arr = ['mao','mao1','mao2','mao3','mao4','mao5','mao6','mao7','mao8','mao9',]
		
		//绘画
		can.addEventListener('click',function(ev){
				//计算坐标的位置
				var dx = ev.clientX  -  can.offsetLeft;
				var dy = ev.clientY - can.offsetTop;
				
				var row =0;
				var col =0;
				
				if(dx%40<20){
					row = Math.floor(dx/40)
					
				}else{
					row = Math.ceil(dx/40)
				}
				
				if(dy%40<20){
					col = Math.floor(dy/40)
					
				}else{
					col = Math.ceil(dy/40)
				}
				
				var index = Math.floor(Math.random()*9+1);
				console.log(index)
				
				mao.src = "img/PNG-091"+index+".png"
				
				ctx.drawImage(mao,row*40-20,col*40-20)
				
				
		})
		
		
		
		//旋转
		
		var adiv = document.querySelectorAll('.jd-item1');
			
		for (var i=0;i<adiv.length;i++) {
			if(i<12){
				adiv[i].style.transform = 'rotate('+30*(i+1)+'deg) translate(50px)';
			}else if(i>=12&&i<36){
				adiv[i].style.transform = 'rotate('+15*(i+1)+'deg) translate(100px)';
			}else{
				adiv[i].style.transform = 'rotate('+7.5*(i+1)+'deg) translate(150px)';
			}
		}
		
		//旋转
		
	}