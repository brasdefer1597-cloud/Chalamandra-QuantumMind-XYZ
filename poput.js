document.addEventListener('DOMContentLoaded', () => {
    const analyzeButton = document.getElementById('analyzeButton');
    const userInput = document.getElementById('userInput');
    const status = document.getElementById('status');
    
    const thesisOut = document.getElementById('thesis-content');
    const antithesisOut = document.getElementById('antithesis-content');
    const synthesisOut = document.getElementById('synthesis-content');

    analyzeButton.addEventListener('click', async () => {
        const topic = userInput.value;
        if (!topic) {
            status.textContent = "Please enter an idea to analyze.";
            status.style.display = 'block';
            return;
        }

        // 1. Show loading state
        status.textContent = "⚡ Collapsing quantum states... (Using Gemini Nano on-device)";
        status.style.display = 'block';
        thesisOut.textContent = "...";
        antithesisOut.textContent = "...";
        synthesisOut.textContent = "...";
        analyzeButton.disabled = true;

        try {
            // 2. Send message to Service Worker (where Gemini Nano lives)
            const response = await chrome.runtime.sendMessage({
                type: 'ANALYZE_DIALECTIC',
                topic: topic
            });

            if (response && response.synthesis) {
                // 3. Show results
                thesisOut.textContent = response.thesis || "No thesis generated.";
                antithesisOut.textContent = response.antithesis || "No antithesis generated.";
                synthesisOut.textContent = response.synthesis || "No synthesis generated.";
                status.style.display = 'none';
            } else if (response && response.error) {
                 throw new Error(response.error);
            } else {
                throw new Error("Invalid response from Service Worker.");
            }

        } catch (error) {
            console.error("Error in dialectical analysis:", error);
            status.textContent = `Error: ${error.message}. Is Gemini Nano enabled?`;
            status.style.display = 'block';
        }

        analyzeButton.disabled = false;
    });
});

