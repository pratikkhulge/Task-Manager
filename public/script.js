// Function to mark a task as completed
function completeTask(taskItem, completeButton) {
    taskItem.classList.toggle('completed');

    // Check if the task is completed
    if (taskItem.classList.contains('completed')) {
        completeButton.textContent = '✔'; // Add a tick mark
        completeButton.disabled = true; // Disable the button

        // Change the task's color when completed
        taskItem.style.backgroundColor = '#ccc'; // You can set any color you prefer
    } else {
        completeButton.textContent = 'Complete'; // Restore the button label
        completeButton.disabled = false; // Enable the button

        // Restore the task's original color
        const priority = taskItem.classList.item(0); // Get the priority class
        if (priority === 'high') {
            taskItem.style.backgroundColor = '#ff6666'; // High priority color
        } else if (priority === 'medium') {
            taskItem.style.backgroundColor = '#ffcc66'; // Medium priority color
        } else if (priority === 'low') {
            taskItem.style.backgroundColor = '#66ff66'; // Low priority color
        }
    }
}

// Function to update task count display
function updateTaskCount() {
    const taskCount = document.getElementById('task-count');
    const taskList = document.getElementById('task-list');
    const count = taskList.childElementCount;
    taskCount.textContent = `Total Tasks: ${count}`;
}

// Function to delete a task
function deleteTask(taskItem) {
    // Remove the task from local storage
    const taskText = taskItem.textContent;
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskItem.remove();

    // Update task count
    updateTaskCount();
}

// Function to add a new task with priority
function addTask() {
    const taskInput = document.getElementById('task');
    const taskText = taskInput.value.trim();
    const prioritySelect = document.getElementById('priority');
    const selectedPriority = prioritySelect.value;

    if (taskText !== '') {
        // Save the task to local storage
        saveTask(taskText, selectedPriority);

        const taskList = document.getElementById('task-list');
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        // Set CSS class based on priority
        taskItem.classList.add(selectedPriority);

        // Create buttons for completion and deletion
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => completeTask(taskItem, completeButton); // Pass the button as an argument

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(taskItem);

        // Append buttons to the task item
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
        taskInput.value = '';

        // Update task count
        updateTaskCount();
    }
}

// Function to save tasks to local storage
function saveTask(taskText, priority) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, priority: priority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;

        // Set CSS class based on priority
        taskItem.classList.add(task.priority);

        // Create buttons for completion and deletion
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.onclick = () => completeTask(taskItem, completeButton); // Pass the button as an argument

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(taskItem);

        // Append buttons to the task item
        taskItem.appendChild(completeButton);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });

    // Update task count
    updateTaskCount();
}

// Load tasks when the page loads
loadTasks();

// Update clock
function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    clock.textContent = `Current Time: ${timeString}`;
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial update
