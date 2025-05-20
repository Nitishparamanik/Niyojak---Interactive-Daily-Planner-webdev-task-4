// quotes.js - Motivational quotes functionality
// Array of quotes if API fails
const fallbackQuotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "It does not matter how slowly you go as long as you do not stop.",
        author: "Confucius"
    },
    {
        text: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair"
    },
    {
        text: "The only limit to our realization of tomorrow will be our doubts of today.",
        author: "Franklin D. Roosevelt"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "We may encounter many defeats but we must not be defeated.",
        author: "Maya Angelou"
    },
    {
        text: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    },
    {
        text: "The secret of getting ahead is getting started.",
        author: "Mark Twain"
    },
    {
        text: "The harder you work for something, the greater you'll feel when you achieve it.",
        author: "Anonymous"
    },
    {
        text: "Your time is limited, don't waste it living someone else's life.",
        author: "Steve Jobs"
    },
    {
        text: "The best way to predict the future is to create it.",
        author: "Peter Drucker"
    },
    {
        text: "Success usually comes to those who are too busy to be looking for it.",
        author: "Henry David Thoreau"
    }
];

let currentQuotes = [...fallbackQuotes]; // Start with fallback quotes
let storedQuotes = [];

function initializeQuotes() {
    // Load stored quotes from localStorage if available
    const storedQuotesString = localStorage.getItem('dailyPlannerQuotes');
    if (storedQuotesString) {
        storedQuotes = JSON.parse(storedQuotesString);
        currentQuotes = [...storedQuotes];
    }
    
    // Fetch quotes from API
    fetchQuotes();
    
    // Display initial quote
    displayRandomQuote();
    
    // Add event listener for new quote button
    document.getElementById('new-quote-btn').addEventListener('click', displayRandomQuote);
}

function fetchQuotes() {
    fetch('https://type.fit/api/quotes')
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                // Format the data to match our structure
                const formattedQuotes = data.map(quote => ({
                    text: quote.text,
                    author: quote.author || 'Unknown'
                }));
                
                // Update our quotes array with the fetched quotes
                currentQuotes = formattedQuotes;
                
                // Store in localStorage for future use
                localStorage.setItem('dailyPlannerQuotes', JSON.stringify(formattedQuotes));
                
                // Display a quote from the newly fetched list
                displayRandomQuote();
            }
        })
        .catch(error => {
            console.log('Error fetching quotes:', error);
            // Will use fallback quotes if fetch fails
        });
}

function displayRandomQuote() {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    
    // Get a random quote
    const randomIndex = Math.floor(Math.random() * currentQuotes.length);
    const quote = currentQuotes[randomIndex];
    
    // Display the quote
    quoteText.textContent = `"${quote.text}"`;
    quoteAuthor.textContent = `— ${quote.author}`;
}