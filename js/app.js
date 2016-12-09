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
		$scope.newTask="";
		$scope.add=function () {
			var id;
			if(!$scope.newTask){
				return;
			}
			if($scope.todoList.length===0){
				id=0;
			}else{
				id=$scope.todoList[$scope.todoList.length-1].id+1;
			}
			$scope.todoList.push({id:id,name:$scope.newTask,isCompleted:false});
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
		$scope.update=function (id) {
			$scope.updateId=id;
        };
		$scope.save=function () {
			$scope.updateId=-1;
        }
    }])
})(angular);
