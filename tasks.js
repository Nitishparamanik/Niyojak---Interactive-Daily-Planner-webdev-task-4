// tasks.js - Task management functionality
let tasks = [];
let currentFilter = 'all';

function initializeTasks() {
    // DOM elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Load tasks from localStorage
    loadTasks();
    
    // Add task event listeners
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    clearCompletedBtn.addEventListener('click', clearCompletedTasks);
    
    // Filter event listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Set current filter
            currentFilter = this.getAttribute('data-filter');
            // Render tasks with new filter
            renderTasks();
        });
    });
}

function loadTasks() {
    const storedTasks = localStorage.getItem('dailyPlannerTasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('dailyPlannerTasks', JSON.stringify(tasks));
    updateTaskCount();
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
            dateAdded: new Date().toISOString()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        
        // Clear input field
        taskInput.value = '';
        taskInput.focus();
    }
}

function toggleTaskCompletion(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    
    // Filter tasks based on current filter
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    
    // Sort tasks by date added (newest first)
    filteredTasks.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
    
    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        taskItem.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${escapeHTML(task.text)}</span>
            <button class="delete-task-btn"><i class="fas fa-trash"></i></button>
        `;
        
        // Add event listeners
        const checkbox = taskItem.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));
        
        const deleteButton = taskItem.querySelector('.delete-task-btn');
        deleteButton.addEventListener('click', () => deleteTask(task.id));
        
        taskList.appendChild(taskItem);
    });
    
    updateTaskCount();
}

function updateTaskCount() {
    const tasksRemainingElement = document.getElementById('tasks-remaining');
    const remainingCount = tasks.filter(task => !task.completed).length;
    tasksRemainingElement.textContent = remainingCount;
}

// Helper function to escape HTML to prevent XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}