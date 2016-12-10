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
            //1 获取数据
            var storage=$window.localStorage;
            var dataStr=storage.getItem('todo');
            var todoList=JSON.parse(dataStr)||[];
            this.getData=function () {
                return todoList;
            };
            //保存数据
            this.saveData=function () {
                storage.setItem('todo',JSON.stringify(todoList));
            };
            //2.添加数据
            this.addData=function (newTask) {
                var id;
                //id的计算方式：取出数据的最后一条的id，然后再加1就是当前的id
                if(todoList.length===0){
                    //说明数组中没有数据
                    id=0;
                }else{
                    //说明已经存在数据了
                    id=todoList[todoList.length-1].id+1;
                }
                todoList.push({id:id,name:newTask,isCompleted:false});
                //清空文本域
                this.saveData();
            };
            //3.删除数据
            this.removeData=function (id) {
                for(var i=0;i<todoList.length;i++){
                    if( todoList[i].id===id){
                        todoList.splice(i,1);
                        this.saveData();
                        return;
                    }
                }
            };
            //5.切换任务完成状态
            this.selectAll=function (isCheckedAll) {
                for(var i=0;i<todoList.length;i++){
                    isCheckedAll?
                        todoList[i].isCompleted=true:
                        todoList[i].isCompleted=false;
                }
                this.saveData();
            };
            //6.清除已完成任务
            this.clearCompleted=function () {
                //目的：将数组中，所有已经完成的任务删除掉
                //转换思路：只需要将未完成的任务取出来，放到temp数组中，最后，在替换todoList
                var temp=[];
                for(var i=0;i<todoList.length;i++){
                    if(!todoList[i].isCompleted){
                        temp.push(todoList[i]);
                    }
                }
                todoList=temp;
                this.saveData();
                //清除数组
                //todoList.length=0;
                //[].push.apply(todoList,temp);
            };
        }])
})(angular)