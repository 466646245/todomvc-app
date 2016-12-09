(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	//创建模块
	var app=angular.module("todoApp",[]);
	app.controller("TodoController",['$scope',function ($scope) {
		//1、展示任务列表
		//思路：创建一个数据列表，然后通过ng-repeat指令将数据展示
		$scope.todoList=[

		];
		//2、添加任务
        //思路：直接给数据todoList添加即可
		$scope.newTask="";
		$scope.add=function () {
			var id;
			//如果是空字符串，就不做任何操作
			if(!$scope.newTask){
				return;
			}
			//id的计算方式：取出数据的最后一条的id，然后再加1就是当前的id
			if($scope.todoList.length===0){
			    //说明数组中没有数据
				id=0;
			}else{
			    //说明已经存在数据了
				id=$scope.todoList[$scope.todoList.length-1].id+1;
			}
			$scope.todoList.push({id:id,name:$scope.newTask,isCompleted:false});
			//清空文本域
			$scope.newTask="";
			console.log($scope.todoList);
        };
		//3.删除一条任务
        $scope.remove=function (id) {
            for(var i=0;i<$scope.todoList.length;i++){
                var temp=$scope.todoList[i];
                if(temp.id==id){
                    $scope.todoList.splice(i,1);
                    return;
                }
            }
        };


        //4. 修改任务
		//添加类名的条件：$scope.updateId与当前元素的ID相同
		$scope.updateId=-1;
		//update方法，只需要让updateId与当前id，这样就可以实现编辑状态
		$scope.update=function (id) {
			$scope.updateId=id;
        };
		//save方法，更新updateId的值为默认值-1，因为数据是双向绑定，
        //所以，item.id===updateId比较的值为false，所以，就由编辑状态变为不可编辑状态
		$scope.save=function () {
			$scope.updateId=-1;
        };

		//5.切换任务选中状态
        $scope.isCheckedAll=false;
        $scope.selectAll=function () {
            for(var i=0;i<$scope.todoList.length;i++){
                $scope.todoList[i].isCompleted=$scope.isCheckedAll;
            }
        };
        //6.清除已完成的任务
        $scope.clearCompleted=function () {
            //目的：将数组中，所有已经完成的任务删除掉
            //转换思路：只需要将未完成的任务取出来，放到temp数组中，最后，在替换todoList
            var temp=[];
            for(var i=0;i<$scope.todoList.length;i++){
                var todo=$scope.todoList[i];
                if(!todo.isCompleted){
                    temp.push(todo);
                }
            }
            $scope.todoList=temp;
            //清除数组
            //$scope.todoList.length=0;
            //[].push.apply($scope.todoList,temp);
        };
        //6.1 控制清除按钮 的展示与隐藏
        $scope.isShow=function () {
            for(var i=0;i<$scope.todoList.length;i++){
                var todo=$scope.todoList[i];
                if(todo.isCompleted){
                    //有已经完成的任务就返回true，让按钮显示出来
                    return true;
                }
            }
            return false;
        };
        //7. 显示未完成的任务数
        $scope.getCount=function () {
            var count=0;
            $scope.todoList.forEach(function (value) {
                //value就是当前元素
                if(!value.isCompleted){
                    count+=1;
                }
            });
            return count;
        }
    }])
})(angular);
