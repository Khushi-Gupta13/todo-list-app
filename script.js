const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const allButton = document.getElementById('allButton');
const activeButton = document.getElementById('activeButton');
const completedButton = document.getElementById('completedButton');
const taskHeading = document.getElementById('taskHeading');

let tasks = [];

// Function to render tasks based on the filter
function renderTasks(filterCompleted = null) {
    taskList.innerHTML = '';
    let filteredTasks = tasks;

    // Apply filter if needed
    if (filterCompleted !== null) {
        filteredTasks = tasks.filter(task => task.completed === filterCompleted);
    }

    // Set the heading based on the filter
    if (filterCompleted === null) {
        taskHeading.textContent = 'All Tasks';
    } else if (filterCompleted === true) {
        taskHeading.textContent = 'Completed Tasks';
    } else {
        taskHeading.textContent = 'Active Tasks';
    }

    // Create the list items
    filteredTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.dataset.index = index;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `
            ${task.text}
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Event listener for adding a new task
addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = {
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = '';  // Clear input
        renderTasks();  // Re-render the tasks
    }
});

// Event listener for clicking on the task list (to mark complete or delete)
taskList.addEventListener('click', (e) => {
    const taskIndex = e.target.closest('li')?.dataset.index;
    if (taskIndex != undefined) {
        if (e.target.tagName === 'LI') {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
        } else if (e.target.tagName === 'BUTTON') {
            tasks.splice(taskIndex, 1);  // Remove task
        }
        renderTasks();  // Re-render after task update
    }
});

// Event listeners for filter buttons
allButton.addEventListener('click', () => renderTasks());
activeButton.addEventListener('click', () => renderTasks(false));
completedButton.addEventListener('click', () => renderTasks(true));

// Initial render
renderTasks();
