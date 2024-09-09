// redirect.js

// Function to get the value of a specific query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to decode a base64-encoded string
function decodeBase64(encodedString) {
    try {
        // Decode the base64 string
        return atob(encodedString);
    } catch (e) {
        console.error('Error decoding base64 string:', e);
        return null;
    }
}

// Check for the 'l' parameter, decode it, and redirect if it is a valid URL
function redirectToLink() {
    const encodedLink = getQueryParam('l'); // Get the base64-encoded value of the 'l' parameter

    if (encodedLink) {
        const decodedLink = decodeBase64(encodedLink); // Decode the base64 string

        // Check if the decoded link is a valid URL
        if (decodedLink && isValidURL(decodedLink)) {
            window.location.href = decodedLink; // Redirect to the decoded URL
        } else {
            console.error('Invalid or missing URL in parameter "l" after decoding.');
        }
    } else {
        console.error('No "l" parameter found in the URL.');
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
