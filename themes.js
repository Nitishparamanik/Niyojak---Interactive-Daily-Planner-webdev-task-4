// themes.js - Theme management functionality
const themes = [
    'theme-nature', // Default (defined in CSS as root variables)
    'theme-ocean',
    'theme-sunset',
    'theme-dark',
    'theme-purple'
];

let currentThemeIndex = 0;

function initializeThemes() {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('dailyPlannerTheme');
    if (savedTheme) {
        // Find the index of the saved theme
        const index = themes.indexOf(savedTheme);
        if (index !== -1) {
            currentThemeIndex = index;
            applyTheme(savedTheme);
        }
    }
    
    // Add event listener for theme toggle button
    document.getElementById('theme-toggle').addEventListener('click', changeTheme);
}

function changeTheme() {
    // Move to the next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    
    // Apply the new theme
    applyTheme(newTheme);
    
    // Save the theme to localStorage
    localStorage.setItem('dailyPlannerTheme', newTheme);
}

function applyTheme(themeName) {
    // Remove all theme classes
    document.body.classList.remove(...themes);
    
    // Add the new theme class if it's not the default theme
    if (themeName !== 'theme-nature') {
        document.body.classList.add(themeName);
    }
    
    // Update theme button text based on current theme
    updateThemeButtonText(themeName);
}

function updateThemeButtonText(themeName) {
    const themeButton = document.getElementById('theme-toggle');
    let themeTxt = '';
    
    switch (themeName) {
        case 'theme-nature':
            themeTxt = 'Nature Theme';
            break;
        case 'theme-ocean':
            themeTxt = 'Ocean Theme';
            break;
        case 'theme-sunset':
            themeTxt = 'Sunset Theme';
            break;
        case 'theme-dark':
            themeTxt = 'Dark Theme';
            break;
        case 'theme-purple':
            themeTxt = 'Purple Theme';
            break;
        default:
            themeTxt = 'Change Theme';
    }
    
    themeButton.innerHTML = `<i class="fas fa-palette"></i> ${themeTxt}`;
}