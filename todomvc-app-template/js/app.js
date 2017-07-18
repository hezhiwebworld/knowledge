(function (window) {
	'use strict';

	// Your starting point. Enjoy the ride!
	angular.module('app',[])
		.controller('Aaa',function( $scope, $location ){
			//数据结构
			var arr = []
			//将数据挂载到scope上
			$scope.dataList = arr;
			$scope.addValue = '';
			//键盘回车事件
			
			//删除出列表
			$scope.ruduce = function(id){
				
			}
			//全选
			$scope.isAll = false;
			$scope.checkAll = function(){
				
			}
			//清除选中的
			$scope.clearComplete = function(){
				$scope.dataList = arr.filter(function( value , index  ){
					return value.isEat == false ;
				})
			}
			//根据hash值来显示内容
			$scope.status = undefined
			//$scope.$watch()
			//var url =  $location.url()
			//console.log( url )

			$scope.location = $location; //监视scope下的方法，才能醒
			$scope.$watch('location.url()' , function( oldValue, newValue ){
				//console.log(  oldValue )
				switch (oldValue){
					case '/active':
						$scope.status = false	
					break;
					case '/completed':
						$scope.status = true	
					break;
					default:
						$scope.status = undefined	
					break;
				}
			})
			//清除完成的按钮的显示的影藏
			$scope.listShow = function(){
					
			}

		})



})(window);


(function(angular){
	//这里定义主模块
	//这数组里面加入依赖的模块
	angular.module('app',[ 'app.ctrl' , 'app.service' ])
	//这里导入需要的模块
})(angular)
