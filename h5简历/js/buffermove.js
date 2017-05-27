function buffermove(obj,json,fn) {
	var icur = 0;
	var speed = 0;
	
	var target = 0;

	if(obj.timer) { clearInterval(obj.timer) }

	obj.timer = setInterval(function() {
		var onoff = true;
		for(var attr in json) {

			//第一步获取目标的当前位置

			if(attr == "opacity") {
				icur = parseInt(parseFloat(getStyle(obj, "opacity")) * 100)
			} else if(attr == "zIndex") {
				icur = json["zIndex"];
			} else {
				icur = parseInt(getStyle(obj, attr));
			}

			//计算速度,并且速度取整；
			target = json[attr];
			speed = (target - icur) / 5;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if(target != icur) {
				onoff = false;
			}

			//判断三种情况
			icur += speed;

			if(attr == "opacity") {
				obj.style.opacity = icur / 100;
				obj.style.filter = "alpha(opacity:" + icur + ")";
			} else if(attr == "zIndex") {
				obj.style.zIndex = icur;
			} else {
				obj.style[attr] = icur + 'px';
			}
		}
		if(onoff==true) {
			
			clearInterval(obj.timer);
			
			if(fn){fn()};
		}
	}, 30)
}

//获取元素样式
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr]
	}
}