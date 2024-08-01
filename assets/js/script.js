// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const newTask = {
        id: generateTaskId(),
        title: 'Task Title',
        description: 'Task Description',
        // Other task properties
    };

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');

    // Set the task card content
    taskCard.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <!-- Add other task details as needed -->
`;
    // Return the created task card element
    return taskCard;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    function renderTaskList(tasks) {
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = ''; // Clear existing content
    
        tasks.forEach(task => {
            const taskCard = createTaskCard(task); // Assume you have a createTaskCard function
            tasksContainer.appendChild(taskCard);
        });

        function createTaskCard(task) {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            taskCard.draggable = true; // Make the task card draggable
        
            taskCard.innerHTML = `
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <!-- Add other task details as needed -->
            `;
        
            // Add event listeners for drag events
            taskCard.addEventListener('dragstart', (event) => {
                event.dataTransfer.setData('text/plain', task.id);
            });
            tasksContainer.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            
            tasksContainer.addEventListener('drop', (event) => {
                event.preventDefault();
                const taskId = event.dataTransfer.getData('text/plain');
                const draggedTask = document.getElementById(taskId);
                tasksContainer.appendChild(draggedTask);
            });
        
            return taskCard;
        }
    }

}

// Todo: create a function to handle adding a new task
function handleAddTask(event) {

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
