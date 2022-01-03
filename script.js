const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

/* Define definitions for all code */

let apiquotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

/* Get index number */ 
function newquote() {
    const quote = apiquotes[Math.floor(Math.random() * apiquotes.length)];
    if(!quote.author) 
    authorText.textContent = 'Unknown'
    else 
    authorText.textContent = quote.author;
    if (quoteText.textContent.length > 50) 
        quoteText.classList.add('long-quote')
    else quoteText.classList.remove('long-quote')
    quoteText.textContent = quote.text;
    complete();
}

/* FetchQuote From API */ 
async function fetchquotes() {
    loading();
const apiurl = 'https://type.fit/api/quotes'
try {
    const response = await fetch(apiurl);
    apiquotes = await response.json();
    newquote();
} 
catch (error) {
    console.log('API Error - Fallback on quotes file');
apiquotes = localQuotes;
newquote();
}
}

// Tweet Quote
function TweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click',newquote);
twitterBtn.addEventListener('click', TweetQuote);

//* On load */
fetchquotes();