/**
 * Created by 丶香葱 on 2016/12/10.
 */
(function (angular) {
    var app1=angular.module('todoApp.todoCtrl',['ngRoute']);
    app1.config(['$routeProvider',function ($routeProvider) {
        $routeProvider.when('/:status?',{
            templateUrl:'todoView.html',
            controller:'TodoController'
        });
    }]);
        app1.controller('TodoController',['$scope','$location','$routeParams','todoSrv',function ($scope,$location,$routeParams,todoSrv) {
        //1、展示任务列表
        //思路：创建一个数据列表，然后通过ng-repeat指令将数据展示
        $scope.todoList=todoSrv.getData();
        //2、添加任务
        //思路：直接给数据todoList添加即可
        $scope.newTask="";
        $scope.add=function () {
            //如果是空字符串，就不做任何操作
            if(!$scope.newTask){
                return;
            }
            todoSrv.addData($scope.newTask);
            $scope.newTask="";
        };
        //3.删除一条任务
        $scope.remove=function (id) {
            todoSrv.removeData(id);
        };
             // 此处，removeData方法内部的this是 $scope
            // $scope.remove = todoSrv.removeData;

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
            todoSrv.saveData();
        };

        //5.切换任务选中状态
        $scope.isCheckedAll=false;
        $scope.selectAll=function () {
           todoSrv.selectAll($scope.isCheckedAll);
        };
        //5.1切换单个任务的完成状态，并保存数据
        $scope.$watch('todoList',function (newValue,oldValue) {
            if(newValue===oldValue) return;
            todoSrv.saveData();
        },true);
        //6.清除已完成的任务
        $scope.clearCompleted=function () {
           todoSrv.clearCompleted();
           //因为数据的指向发生了改变，此时，需要重新获取当前值！
           $scope.todoList=todoSrv.getData();
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
        };
        //8.显示不同状态的任务
        // $scope.status={};
        //9.根据URL变化显示相应的任务
        // $scope.location=$location;
        // $scope.$watch('location.url()',function (newValue,oldValue) {
        //     switch(newValue) {
        //         case '/':
        //             $scope.status = {};
        //             break;
        //         case '/active':
        //             $scope.status = {isCompleted: false};
        //             break;
        //         case '/completed':
        //             $scope.status = {isCompleted: true};
        //             break;
        //         default:
        //             $scope.status = {};
        //             break;
        //     }
        // })
            switch ($routeParams.status){
                case "":
                    $scope.status={};
                    break;
                case "active":
                    $scope.status={isCompleted:false};
                    break;
                case "completed":
                    $scope.status={isCompleted:true};
                    break;
                default:
                    $scope.status={};
                    break;
            }
    }]);
})(angular);