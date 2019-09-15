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
    addTask(todo);
}

function addTask(taskToAdd){
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd,
        }).then(function(response) {
          console.log('Response from server: ', response);
        //   refreshBooks(); --->function that runs GET request, which will run a function that appends to DOM
        }).catch(function(error) {
          console.log('Error in POST', error)
          alert('Unable to add task');
        });
    }