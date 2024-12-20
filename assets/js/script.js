// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const taskForm = document.getElementById("taskForm");

/// Todo: create a function to generate a unique task id
let currentId = 0; // assigns a variable to keep track of the last used ID

function generateTaskId() {
  return ++currentId; // Increment and return the current ID
}

function generateRandomId(length = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


// Todo: create a function to create a task card
function createTaskCard(task) {
  const taskCard = document.createElement('div');
  taskCard.classList.add('task-card');
  taskCard.classList.add('draggable');
  taskCard.setAttribute("data-task-id", task.id)

  // Check the deadline and set the background color
  const currentDate = new Date();
  const deadlineDate = new Date(task.deadline); 
  const timeDifference = deadlineDate - currentDate; // Difference in milliseconds

// Set color based on deadline status
if (timeDifference < 0) {
  // Overdue
  taskCard.style.backgroundColor = 'red';
} else if (timeDifference < 2 * 24 * 60 * 60 * 1000) { // 2 days in milliseconds
  // Nearing deadline (within 2 days)
  taskCard.style.backgroundColor = 'yellow';
}


  // Set the task card content
  taskCard.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <button class="btn btn-danger" onclick="handleDeleteTask(event)" data-task-id="${task.id}">Delete</button>
    <!-- Add other task details as needed -->
`;
  // Return the created task card element
  return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const todoContainer = document.getElementById('todo-cards');
  todoContainer.innerHTML = ''; // Clear existing content
  const inProgressContainer = document.getElementById('in-progress-cards');
  inProgressContainer.innerHTML = ''; // Clear existing content
  const doneContainer = document.getElementById('done-cards');
  doneContainer.innerHTML = ''; // Clear existing content
  const tasks = JSON.parse(localStorage.getItem("newTask")) || []
  tasks.forEach(task => {
    const taskCard = createTaskCard(task);
    if (task.status == "to-do") {
      todoContainer.appendChild(taskCard);

    }
    if (task.status == "in-progress") {
      inProgressContainer.appendChild(taskCard);

    }
    if (task.status == "done") {
      doneContainer.appendChild(taskCard);

    }

  });
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // Return the clone with the width set to the width of the original card. 
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}



// Todo: create a function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();
  const title = document.getElementById("title").value
  const date = document.getElementById("taskDueDate").value
  const description = document.getElementById("description").value
  const data = {
    id: generateRandomId(),
    title,
    deadline: date,
    description,
    status: "to-do"
  }

  const savedTasks = JSON.parse(localStorage.getItem("newTask")) || []
  savedTasks.push(data)
  localStorage.setItem("newTask", JSON.stringify(savedTasks))

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  // Get the task ID from the button's data attribute
  const taskId = event.target.getAttribute('data-task-id');

  
  // Find the task card element and remove it from the DOM
  const taskCard = document.querySelector(`[data-task-id="${taskId}"]`);
  if (taskCard) {
      taskCard.remove();
  }
}


// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

  const tasks = JSON.parse(localStorage.getItem("newTask")) || []
  const taskId = ui.draggable[0].dataset.taskId;
  const newStatus = event.target.id;

  console.log(taskId)
  console.log(newStatus)

  for (let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }
  localStorage.setItem("newTask", JSON.stringify(tasks))

  renderTaskList()
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

  taskForm.addEventListener("submit", handleAddTask)
  renderTaskList()
});



// // const taskId = $(this).attr('data-project-id');
//   const tasks = readProjectsFromStorage();

//   projects.forEach((task) => {
//     if (task.id === taskId) {
//       tasks.splice(tasks.indexOf(task), 1);
//     }
//   });


// saveProjectsToStorage(projects);

// printProjectData();