
## 清除浮动的方法及原理

-  能父级元素产生一个实际或者虚拟的高度的方法都可以清楚浮动

- 原理一（利用某些具有包裹特性的元素）

```js
	//先考虑ie8以上的情况
	
	//demo
	<div id="demo">
		<div id="demo1"></div>
	</div>
	//样式
	#demo{
		padding: 20px;
		background: red;
		/*display: inline-block;*/
		/*float: left;*/
		/*position: absolute;*/
		/*overflow: hidden;*/
		/*display: table-cell;*/    ie7以上才支持
		/*display: table;*/			ie7以上才支持
	}
	#demo1{
		height: 100px;
		width: 100px;
		background: green;
		float: left;
	}
	
	//解决ie6/7的清除浮动
	//想办法触发haslayout   一般情况触发的方法 zoom：1  // 设置宽度  // 设置高度
```

- 原理二（clear：both/left/right）

> 这个属性存在的意义就清除浮动的
