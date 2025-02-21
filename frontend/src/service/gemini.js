import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDh1C88Dy6KWvJB2julcjTYEKaMyPrkp6I");

export const getChatResponse = async (prompt) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const chat = model.startChat({
            history: [],
            generationConfig: {
                maxOutputTokens: 2048,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to get AI response');
    }
};

export const getTaskSuggestions = async (currentTasks) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        
        const result = await model.generateContent({
            contents: [{
                role: "user",
                parts: [{
                    text: `Based on these current tasks: ${JSON.stringify(currentTasks)},
                    suggest 3 new complementary tasks.
                    
                    Format each suggestion as:
                    Suggested Task: [Title]
                    Description: [Brief explanation]
                    Priority: [High/Medium/Low]
                    
                    Keep suggestions practical and relevant.`
                }]
            }]
        });

        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Gemini API Error:', error);
        return [];
    }
};
