define(['Task'], function (Task){
    var lastTaskId = 0;
    function getAllTasks(){
        var result = [];
        for(var i=0; i<window.localStorage.length;i++){
            var key = window.localStorage.key(i);
            var taskString = window.localStorage.getItem(key);
            var taskObj = JSON.parse(taskString);
            lastTaskId = lastTaskId < taskObj.id ? taskObj.id : lastTaskId;
            var task = new Task(taskObj.id, taskObj.name, taskObj.isCompleted);
            result.push(task);
        }
        return result;
    }
    function addTask(taskName){
        ++lastTaskId;
        var newTask = new Task(lastTaskId, taskName, false);
        window.localStorage.setItem(lastTaskId, JSON.stringify(newTask));

        return newTask;
    }
    function removeTask(id){
        window.localStorage.removeItem(id);
    }
    function toggleTask(id){
        var taskString = window.localStorage.getItem(id);
        var taskObj = JSON.parse(taskString);
        taskObj.isCompleted = !taskObj.isCompleted;
        window.localStorage.setItem(taskObj.id, JSON.stringify(taskObj));
    }

    return {
        getAll : getAllTasks,
        add : addTask,
        toggle : toggleTask,
        remove : removeTask
    };
});
