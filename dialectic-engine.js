// dialectic-engine.js
// This is the BRAIN: The DialecticQuantumAssistant class that runs 100% locally.

export class DialecticQuantumAssistant {
    constructor() {
        this.geminiSession = null;
        this.initializeGeminiNano();
    }

    async initializeGeminiNano() {
        try {
            // This is the Hybrid/Local AI API (Gemini Nano)
            if (await chrome.ai.languageModel.availability() === 'available') {
                this.geminiSession = await chrome.ai.languageModel.create({
                    systemPrompt: 'You are a dialectical assistant who generates a thesis, antithesis, and synthesis.'
                });
                console.log("CHALAMANDRA: Gemini Nano (Dialectical Engine) INITIALIZED.");
            }
        } catch (e) {
            console.error("CHALAMANDRA: Gemini Nano initialization failed:", e);
        }
    }

    // DIALECTICAL ANALYSIS (Uses Gemini Nano via Prompt API)
    async performDialecticAnalysis(coreIdea) {
        if (!this.geminiSession) {
            await this.initializeGeminiNano(); // Try to re-init
            if (!this.geminiSession) {
                throw new Error("Gemini Nano engine is not available.");
            }
        }

        try {
            // 1. THESIS (CHOLA)
            const thesisResult = await this.geminiSession.prompt(`Generate the thesis (the main argument) for: "${coreIdea}"`);
            const thesis = thesisResult.text();
            
            // 2. ANTITHESIS (MALANDRA)
            const antithesisResult = await this.geminiSession.prompt(`Generate the antithesis (the strongest counter-argument) for the thesis: "${thesis}"`);
            const antithesis = antithesisResult.text();
            
            // 3. SYNTHESIS (FRESA)
            const synthesisResult = await this.geminiSession.prompt(`Generate a superior synthesis (the quantum solution) that resolves the conflict between: [THESIS: ${thesis}] and [ANTITHESIS: ${antithesis}]`);
            const synthesis = synthesisResult.text();
            
            // Simulating the 0.8s (local AI is fast)
            return { thesis, antithesis, synthesis };

        } catch (error) {
            console.error("Error during dialectical prompt:", error);
            throw new Error(`Quantum Engine Failure: ${error.message}`);
        }
    }
    
    // Here is where the other 5 APIs (Summarizer, Rewriter, etc.) would be called
    
    async getSummarizerAnalysis(content) {
        // 4. SUMMARIZER API
        if (chrome.ai.summarizer) {
            const summaryResult = await chrome.ai.summarizer.create({ text: content });
            return summaryResult.summary;
        }
        return "Summarizer not available.";
    }

    async getProofreaderAnalysis(content) {
        // 5. PROOFREADER API
        if (chrome.ai.proofreader) {
            const proofreadResult = await chrome.ai.proofreader.create({ text: content });
            return proofreadResult.proofreadText;
        }
        return content; // Return original if not available
    }
}

