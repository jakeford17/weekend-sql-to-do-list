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
    $("#newTaskIn").val("");
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
          console.log('Error in POST function: ', error)
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
        console.log('Error in GET function: ', error);
      });
}

function appendTasks(listOfTasks){
    console.log("In appendTasks: ", listOfTasks);
    $("#taskTable").empty();
    for(let i=0; i<listOfTasks.length; i++){
        let taskObject = listOfTasks[i];
        if (taskObject.status===false){
            $("#taskTable").append(`
            <tr data-id="${taskObject.id}">
                <td>${taskObject.task}</td>
                <td>No</td>
                <td><button class="completeButton">Completed Task</button></td>
                <td><button class="deleteButton">Delete</button></td>
            </tr>
            `);
        }else if (taskObject.status===true){
            $("#taskTable").append(`
            <tr class="completedTask" data-id="${taskObject.id}">
                <td>${taskObject.task}</td>
                <td>Yes</td>
                <td>DONE!</td>
                <td><button class="deleteButton">Delete</button></td>
            </tr>
            `);
        }
    }
    $(".completeButton").on('click', completeTask);
    $(".deleteButton").on('click', deleteTask);
}

function completeTask(){
    let taskId = $(this).parent().parent().data("id");
    let completeStatus = $(this).text();
    console.log("Complete Task with ID and Status: ", taskId, completeStatus);
    $.ajax({
        type: 'PUT',
        url: `/tasks/status/${taskId}`,
        data: {
            status: completeStatus
        }
        }).then( function(response){
          console.log(response);
          refreshTaskList();
      }).catch( function(error){
          alert("Error in PUT function: ", error);
      })
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
        alert("Error in DELETE function: ", error);
    })
}