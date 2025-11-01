// content-script.js
// This script runs on all pages.
// Currently, it's just used to enable the implicit feedback logic
// in the service worker (via webNavigation).

console.log("CHALAMANDRA: Content Script Loaded.");

// Example of how you could send a message to the service worker from the page:
document.addEventListener('mouseup', () => {
    const selectedText = window.getSelection().toString();
    if (selectedText.length > 10) {
        // Optional: Send selected text to the service worker
        // chrome.runtime.sendMessage({ type: 'TEXT_SELECTED', content: selectedText });
    }
});

