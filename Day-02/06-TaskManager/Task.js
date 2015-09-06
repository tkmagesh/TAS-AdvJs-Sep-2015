define([], function(){
    function Task(id, name, isCompleted){
        this.id = id;
        this.name = name;
        this.isCompleted = isCompleted;
    }
    return Task;
});
