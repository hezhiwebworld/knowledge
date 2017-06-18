

function loadScript(url,callback){
	var script= document.createElement('script');
	script.type= "text/javascript";
	
	if(script.readyState){//IE
		script.onreadystatechange = function(){
			if(script.readyState=="loaded"||script.readyState=="complete"){
				//释放句柄，防止事件二次发生；
				script.onreadystatechange = null;
				
				callback&&callback();
				
			}
		}
	}else{//others
		script.onload = function(){
			callback&&callback();
		}
	}
	
	script.src = url;
	
	//插入页面中；
	document.body.appendChild(script); 
}
