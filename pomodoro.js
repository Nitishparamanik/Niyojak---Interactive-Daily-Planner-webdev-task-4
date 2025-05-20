// pomodoro.js - Pomodoro timer functionality
let timer;
let timerRunning = false;
let timeLeft = 25 * 60; // 25 minutes in seconds
let selectedTime = 25; // Default 25 minutes

function initializePomodoro() {
    // DOM elements
    const startButton = document.getElementById('start-timer');
    const pauseButton = document.getElementById('pause-timer');
    const resetButton = document.getElementById('reset-timer');
    const timerOptions = document.querySelectorAll('.timer-option');
    
    // Event listeners
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    
    // Timer options event listeners
    timerOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            timerOptions.forEach(o => o.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            // Set selected time
            selectedTime = parseInt(this.getAttribute('data-time'));
            // Reset timer with new time
            resetTimer();
        });
    });
    
    // Initialize timer display
    updateTimerDisplay();
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        
        // Update button states
        document.getElementById('start-timer').disabled = true;
        document.getElementById('pause-timer').disabled = false;
        
        // Start the timer
        timer = setInterval(function() {
            timeLeft--;
            
            if (timeLeft <= 0) {
                // Timer finished
                clearInterval(timer);
                timerRunning = false;
                timeLeft = 0;
                
                // Play notification sound
                playTimerEndSound();
                
                // Show notification
                showTimerNotification();
                
                // Reset button states
                document.getElementById('start-timer').disabled = false;
                document.getElementById('pause-timer').disabled = true;
            }
            
            updateTimerDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    if (timerRunning) {
        clearInterval(timer);
        timerRunning = false;
        
        // Update button states
        document.getElementById('start-timer').disabled = false;
        document.getElementById('pause-timer').disabled = true;
    }
}

function resetTimer() {
    // Clear existing timer
    if (timerRunning) {
        clearInterval(timer);
        timerRunning = false;
    }
    
    // Reset time to selected minutes
    timeLeft = selectedTime * 60;
    
    // Update button states
    document.getElementById('start-timer').disabled = false;
    document.getElementById('pause-timer').disabled = true;
    
    // Update display
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    
    // Update page title
    document.title = `(${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}) Daily Planner`;
}

function playTimerEndSound() {
    // Create audio element
    const audio = new Audio();
    audio.src = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';
    audio.play().catch(e => {
        console.log('Sound play failed:', e);
        // Browser may block autoplay
    });
}

function showTimerNotification() {
    // Check if browser supports notifications
    if ('Notification' in window) {
        // Check if permission is already granted
        if (Notification.permission === 'granted') {
            createNotification();
        } else if (Notification.permission !== 'denied') {
            // Request permission
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    createNotification();
                }
            });
        }
    }
    
    // Create and show a notification
    function createNotification() {
        const notification = new Notification('Pomodoro Timer', {
            body: 'Time is up! Take a break or start a new timer.',
            icon: 'https://cdn-icons-png.flaticon.com/512/3388/3388796.png' // Default timer icon
        });
        
        // Close notification after 5 seconds
        setTimeout(() => {
            notification.close();
        }, 5000);
    }
}