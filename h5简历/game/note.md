###Welcome to use MarkDown

```js
	<style type="text/css">
		.box{
			width: 600px;
			height: 600px;
			background: url(img/bak.jpg) no-repeat;
			background-size: cover;
			margin: 30px auto;
			border: 1px solid #000000;
		}
	</style>
```		
	
```js		
		<div class="box">
			<canvas id="can" width="600" height="600px"></canvas>
		</div>
```

```js
		<script type="text/javascript">
			var maps = [];
				for(var i=0;i<15;i++){
					maps[i] = [];
					for(var j=0;j<15;j++){
					maps[i][j] = 0;
					}
			}
			//制作棋盘
			var can = document.getElementById("can");
			
			var ctx = can.getContext('2d');
			
			var isblack = true;
			
			ctx.strokeStyle ="#000";
			
			for(var i=0;i<15;i++){
				for(var j=0;j<15;j++){
					ctx.strokeRect(j*40,i*40,40,40)
				}
			}
			
			//制作棋子
			var black = new Image();
			var white  = new Image();
			black.src = "img/black.png"
			white.src = "img/white.png"
			
			
			
			can.addEventListener('click',function(ev){
				var dx = ev.clientX  -  can.offsetLeft;
				var dy = ev.clientY - can.offsetTop;
				
//				console.log(dx,dy)

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
				
//				console.log(row,col)
				
				
				
				
				if(isblack){
					
					
					ctx.drawImage(black,row*40-20,col*40-20)
					isblack = false;
					
					maps[row][col] = 2 //黑
					
					iswin(2,row,col)
				}else{
					ctx.drawImage(white,row*40-20,col*40-20)
					isblack = true;
					
					maps[row][col] = 1  //白
					
					iswin(1,row,col)
				}
				
				//判断输赢
				function iswin(t,row,col){
					var orgrow = row ;   //将目标点存起来
					var orgcol = col ;
					var total =1;
					
					//垂直方向
					while(col-1>0&&maps[row][col-1] == t){
						total++;
						col--;
					}
					
					row = orgrow ;
					col = orgcol;
					
					while(col+1<15&&maps[row][col+1] == t){
						
						col++;
						total++;
					}
					console.log(total)
					if(total>=5){
						if(t==1){
							setTimeout(function(){alert('白子赢了')},500)
						}else{
							
							setTimeout(function(){alert('黑子赢了')},500);
						}
					}
					
					
					//水平方向
					row=orgrow;
			    	col=orgcol;
			    	total=1;
			    	while(row-1>0&&maps[row-1][col]==t)
			    	{
			    		row--;
			    		total++;
			    	}
			    	row=orgrow;
			    	col=orgcol;
			    	while(row+1<15&&maps[row+1][col]==t)
			    	{
			    		row++;
			    		total++;
			    	}
			    	if(total>=5)
			    	{
			    		if(t==1)
			    		alert("白子赢");
			    		else
			    		alert("黑子赢");
			    	}
		    	
		    			
		    		//左下和右上
		    		row = orgrow ;
					col = orgcol;
					total =1;
		    		while(row+1<15&&col-1>0&&maps[row+1][col-1]==t){
		    				row++;
		    				col--;
		    				total++;
		    		}
		    		row = orgrow ;
					col = orgcol;
		    		while(row-1>0&&col+1<15&&maps[row-1][col+1] == t){
		    			row--;
		    			col++;
		    			total++;
		    		}
		    		if(total>=5){
		    			if(t==1){
							setTimeout(function(){alert('白子赢了')},500)
						}else{
							
							setTimeout(function(){alert('黑子赢了')},500);
						}
		    		}
		    		
		    		//右下和左上
		    		row = orgrow ;
					col = orgcol;
		    		total=1;
		    		while(row+1<15&&col+1<15&&maps[row+1][col+1]==t){
		    				row++;
		    				col++;
		    				total++;
		    		}
		    		row = orgrow ;
					col = orgcol;
					
		    		while(row-1>0&&col-1>0&&maps[row-1][col-1] == t){
		    			row--;
		    			col--;
		    			total++;
		    		}
		    		if(total>=5){
		    			if(t==1){
							setTimeout(function(){alert('白子赢了')},500)
						}else{
							
							setTimeout(function(){alert('黑子赢了')},500);
						}
		    		}
		    		//至此所有方向游戏都结束呢
		    	
				}
				
			})
			
		</script>
```
