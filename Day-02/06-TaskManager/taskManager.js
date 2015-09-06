define(['jquery','taskStorage'], function($, taskStorage){
    function addToList(task){
        $("<li></li>")
            .text(task.name)
            .attr("data-task-id", task.id)
            .addClass(task.isCompleted ? "completed" : "")
            .appendTo("#olTaskList");
    }
    function onBtnAddTaskClick(){
        var taskName = $("#txtTask").val();
        var newTask = taskStorage.add(taskName);
        addToList(newTask);
    }
    function onBtnRemoveCompletedClick(){
        $("#olTaskList > li.completed").each(function(index, element){
            var $element = $(element);
            var taskId = $element.attr("data-task-id");
            taskStorage.remove(taskId);
            $element.remove();
        });
    }
    function onTaskItemClick(){
        taskStorage.toggle($(this).attr("data-task-id"));
        $(this).toggleClass("completed");
    }
    return {
        init : function(){
            $("#btnAddTask").click(onBtnAddTaskClick);
            $("#btnRemoveCompleted").click(onBtnRemoveCompletedClick);
            $("#olTaskList").on("click", "li", onTaskItemClick);
            taskStorage.getAll().forEach(addToList);

        }
    };
});
