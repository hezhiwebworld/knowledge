(function(angular){
    //这里需要用到服务的数据
    angular.module('app.ctrl',[])
        .controller('Ctrl',function($scope,$window,DataService,$location){
          
          //获取数据
          $scope.dataList = DataService.getData()
          console.log(  $scope.dataList )
         
          //添加数据
          $scope.addValue = '';
          $scope.mykeyup = function ( ev ) {
              var ev = ev || event
              DataService.addList( ev,  $scope.addValue ) 
              //数据归零
              if( ev.keyCode === 13 ){
                 $scope.addValue = '';
              }
          }
          //删除数据
          $scope.ruduce = function(id){
              DataService.reduce(id)
          }
          //全选
          $scope.isAll = false;
          $scope.checkAll = function( ){
            DataService.checkAll($scope.isAll)
          }
          //清除已经完成的任务
          $scope.clearComplete = function(){
                $scope.dataList = DataService.clearCompleted()
                DataService.save( $scope.dataList)
                console.log( $scope.dataList)
          }
          // 清除按钮的展示和隐藏
          $scope.isShow = function(){
              return DataService.isShow()
          }
          //统计未完成的数量
          $scope.count = DataService.count
          //更具hash值显示隐藏
          $scope.hashName = "all"
          $scope.data = function(){
             $scope.hashName = $location.url().substring(1)
              $scope.dataList =  DataService.fliterData(  $scope.hashName)() 
             
          }

        })

})(angular)