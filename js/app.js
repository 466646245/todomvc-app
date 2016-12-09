(function (angular) {
	'use strict';

	// Your starting point. Enjoy the ride!
	//创建模块
	var app=angular.module("todoApp",[]);
	app.controller("TodoController",['$scope',function ($scope) {
		//1、展示任务列表
		//思路：创建一个数据列表，然后通过ng-repeat指令将数据展示
		$scope.todoList=[
			{id:0,name:'吃饭',isCompleted:false},
            {id: 1, name: '睡觉', isCompleted: true},
            {id: 2, name: '学习', isCompleted: false},
            {id: 3, name: '打豆豆', isCompleted: false}
		];
    }])
})(angular);
