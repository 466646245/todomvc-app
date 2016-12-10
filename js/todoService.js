/**
 * Created by 丶香葱 on 2016/12/10.
 */
(function (angular) {
    angular.module('todoApp.todoSrv',[])
        .service('todoSrv',[function () {
            this.test="这是测试数据";
        }])
})(angular)