console.log("js");

$(document).ready(onReady);

function onReady() {
    console.log("jQ");
    $("#newTaskButton").on('click', submitNewTask);
}

function submitNewTask(){
    console.log("SUBMIT BUTTON CLICKED");
    let todo = {};
    todo.task = $('#newTaskIn').val(); //keeping task inputted inside an object
    console.log("Task Entered: ", todo)
    // addTask(task);
}