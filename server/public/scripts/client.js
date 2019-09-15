console.log("js");

$(document).ready(onReady);

function onReady() {
    console.log("jQ");
    $("#newTaskButton").on('click', submitNewTask);
    refreshTaskList();
}

function submitNewTask(){
    console.log("SUBMIT BUTTON CLICKED");
    let todo = {
        task: "",
        status: ""
    };
    todo.task = $('#newTaskIn').val(); //keeping task inputted inside an object
    console.log("Task Entered: ", todo)
    addTask(todo);
}

function addTask(taskToAdd){
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: taskToAdd
        }).then(function(response) {
          console.log('Response from server: ', response);
          refreshTaskList(); //function that runs GET request, which will run a function that appends to DOM
        }).catch(function(error) {
          console.log('Error in POST', error)
          alert('Unable to add task');
        });
    }

function refreshTaskList(){
    $.ajax({
        type: 'GET',
        url: '/tasks'
      }).then(function(response) {
        console.log(response); 
        appendTasks(response);
      }).catch(function(error){
        console.log('error in GET', error);
      });
}

function appendTasks(listOfTasks){
    console.log("In appendTasks: ", listOfTasks);
    $("#taskTable").empty();
    for(let i=0; i<listOfTasks.length; i++){
        let taskObject = listOfTasks[i];
        $("#taskTable").append(`
        <tr data-id="${taskObject.id}">
            <td>${taskObject.task}</td>
            <td>${taskObject.status}</td>
            <td><button class="completeButton">Complete Task</button></td>
            <td><button class="deleteButton">Delete</button></td>
        </tr>
    `);
    }
    $(".completeButton").on('click', completeTask)
    $(".deleteButton").on('click', deleteTask);
}

function completeTask(){
    let taskId = $(this).parent().parent().data("id");
    console.log("Complete Task with ID: ", taskId);
}

function deleteTask(){
    let taskId = $(this).parent().parent().data("id");
    console.log("Delete Task with ID: ", taskId);
    $.ajax({
        type: 'DELETE',
        url: `tasks/${taskId}`, 
    })
    .then(function(response){
        console.log("RESPONSE", response);
        refreshTaskList();
    })
    .catch(function(error){
        alert("Error: ", error);
    })
}