// script.js

// Function to encode the URL in base64
function encodeBase64(url) {
    try {
        // Encode the URL using btoa (base64 encoding)
        return btoa(url);
    } catch (e) {
        alert('Invalid URL! Please enter a valid URL.');
        return null;
    }
}

// Function to create the short link
function createShortLink() {
    const urlInput = document.getElementById('urlInput').value.trim();

    // Check if the input is not empty
    if (urlInput) {
        const encodedUrl = encodeBase64(urlInput);

        if (encodedUrl) {
            // Construct the short link with the base64 encoded value
            const shortLink = `https://kin1009.github.io/shorturl?l=${encodedUrl}`;
            
            // Display the encoded link in the anchor element
            const encodedLinkElement = document.getElementById('encodedLink');
            encodedLinkElement.href = shortLink;
            encodedLinkElement.textContent = shortLink;
        }
    } else {
        alert('Please enter a URL.');
    }
}

// Function to copy the link to the clipboard
function copyToClipboard() {
    const encodedLinkElement = document.getElementById('encodedLink');

    if (encodedLinkElement.textContent) {
        // Copy the link text to the clipboard
        navigator.clipboard.writeText(encodedLinkElement.textContent)
            .then(() => {
                alert('Link copied to clipboard!');
            })
            .catch((err) => {
                alert('Failed to copy link. Please try again.');
                console.error('Error copying text: ', err);
            });
    } else {
        alert('No link to copy. Please generate a link first.');
    }
}

// Add event listeners for the buttons
document.getElementById('generateButton').addEventListener('click', createShortLink);
document.getElementById('copyButton').addEventListener('click', copyToClipboard);
