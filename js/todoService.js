/**
 * Created by 丶香葱 on 2016/12/10.
 */
(function (angular) {
    angular.module('todoApp.todoSrv',[])
        .service('todoSrv',['$window',function ($window) {
            //todo：将控制器中所有与数据相关的操作全部放到服务中
            //          控制器中如果要操作数据，只需要调用服务中的相应的方法即可
            // 将数据存储在localStorage中，因此ng中没有单独提供这个服务，
            //此时，可以通过$window这个服务获取到
            var storage=$window.localStorage;
            var dataStr=storage.getItem('todo');
            var todoList=JSON.parse(dataStr)||[];
            this.getData=function () {
                return todoList;
            };
        }])
})(angular)