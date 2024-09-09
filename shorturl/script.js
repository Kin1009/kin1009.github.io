// redirect.js

// Function to get the value of a specific query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Check for the 'l' parameter and redirect if it exists
function redirectToLink() {
    const link = getQueryParam('l'); // Get the value of the 'l' parameter

    // Check if 'l' parameter exists and is a valid URL
    if (link && isValidURL(link)) {
        window.location.href = link; // Redirect to the specified URL
    } else {
        console.error('Invalid or missing URL in parameter "l"');
    }
}

// Helper function to validate the URL
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Call the redirect function
redirectToLink();
