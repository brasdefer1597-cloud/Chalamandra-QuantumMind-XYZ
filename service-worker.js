// service-worker.js
// Imports the engine and handles communication with the popup and APIs.
import { DialecticQuantumAssistant } from './dialectic-engine.js';

// Initialize the assistant when the Service Worker starts
const assistant = new DialecticQuantumAssistant();

// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'ANALYZE_DIALECTIC') {
        (async () => {
            try {
                // Call the dialectical engine which uses Gemini Nano
                const result = await assistant.performDialecticAnalysis(request.topic);
                sendResponse(result);
            } catch (e) {
                sendResponse({ error: e.message });
            }
        })();
        return true; // Indicates the response will be asynchronous
    }

    // (Optional) Handle other APIs
    if (request.type === 'SUMMARIZE_CONTENT') {
        (async () => {
            try {
                const summary = await assistant.getSummarizerAnalysis(request.content);
                sendResponse({ summary: summary });
            } catch (e) {
                sendResponse({ error: e.message });
            }
        })();
        return true;
    }
});

// (Optional) Implicit feedback from navigation
chrome.webNavigation.onCompleted.addListener((details) => {
    if (details.frameId === 0) {
        // This is where the implicit 'Quantum Update' logic would go
        console.log(`Navigation complete: ${details.url}. Firing implicit Quantum Update.`);
    }
});

// Install context menu to use the Summarizer
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "chalamandra-summarize",
        title: "Chalamandra: Extract Thesis (Summarizer)",
        contexts: ["selection"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "chalamandra-summarize" && info.selectionText) {
        // Send selected text to the service worker to be summarized
        chrome.runtime.sendMessage({
            type: 'SUMMARIZE_CONTENT',
            content: info.selectionText
        });
        // (You could then open the popup and fill it)
    }
});

