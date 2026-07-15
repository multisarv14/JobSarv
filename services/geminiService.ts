
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY is not set. AI features will not be available.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateResumeContentStream = async (prompt: string) => {
    if (!API_KEY) {
        throw new Error("API key is not configured.");
    }
    try {
        const response = await ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                thinkingConfig: { thinkingBudget: 0 }
            }
        });
        return response;
    } catch (error) {
        console.error("Error generating content from Gemini:", error);
        throw new Error("Failed to generate AI content.");
    }
};
