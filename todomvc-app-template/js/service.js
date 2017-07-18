(function(angular){
    angular.module('app.service',[])
        .service('DataService',function( $window ){
            var that = this ;
             //首先准备数据
            var localStorage = $window.localStorage
            var dataList = JSON.parse(localStorage.getItem('work')) || []   //保证获得是一个字符串
            
            //1. 获取数据 --- 数据的复用，像vue中多组件共享数据
            this.getData = function(){
                return dataList
            }
            //利用本地存储避免刷新出现问题
            this.save = function (dataList){
                console.log(dataList)
                localStorage.setItem( 'work' , JSON.stringify( dataList ) )
            }
            //2. 添加数据 --- 
            this.addList = function( event , value ){
                var id ;
				if(event.keyCode === 13){
					//对id做一个限制
					//怎么限制能，数组最后一位的id加1
					if(dataList.length){
						id = dataList[dataList.length-1].id +1
					}else{
						id = 1
					}
					//做个限制
					if(value.trim() === ''){
						return;
					}
					dataList.unshift({
						title : value,
						isEat : false,
						//id不能重复
						id : id
					})
				}
                //保存数据
                 that.save(dataList)
            } 

            //3. 删除任务
            this.reduce = function( id ) {
                for(var i = 0 ; i < dataList.length;i++) {
					if(dataList[i].id == id){
						dataList.splice( i , 1 )
						return;
					}
				}
                //保存数据
                that.save(dataList)
            }
            //4. 全选按钮
            this.checkAll = function(isAll){
                if(!isAll){
					for(var i=0 ; i <dataList.length ; i++){
						dataList[i].isEat = false;
					}
					isAll = false;
				}else{
					for(var i=0 ; i <dataList.length ; i++){
						dataList[i].isEat = true;
					}
					isAll = true;
				}
            }
            //5. 清除已完成任务
            this.clearCompleted = function(){
                return dataList.filter(function( value , index  ){
					return value.isEat == false ;
				})
                
            }
            //6. 清除按钮的显示影藏
            this.isShow = function(){
                for( var i =0; i < dataList.length ; i++ ){
                    if( dataList[i].isEat ){
                        return true
                    }
                }
                return false;
            }
            //7. 显示未完成数
            this.count = function(){
                var num =0;
                for( var i =0; i < dataList.length ; i++ ){
                    if( !dataList[i].isEat ){
                        num++
                    }
                }
                return num
            }
            //8 根据hash值过滤数据
            this.fliterData = function (hasdName) {
                var filterList = {
                    all : function(){
                        return dataList
                    },
                    active : function(){
                        return dataList.filter(function(ele){
                            return ele.isEat == false
                        })
                    },
                    completed : function(){
                        return dataList.filter(function(ele){
                            return ele.isEat == true
                        })
                    }
                }

                return filterList[hasdName]
            }
        })
})(angular)