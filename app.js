// app.js - Main application file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    updateCurrentDate();
    initializeQuotes();
    initializeTasks();
    initializePomodoro();
    initializeThemes();
});

// Update current date
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString('en-US', options);
}