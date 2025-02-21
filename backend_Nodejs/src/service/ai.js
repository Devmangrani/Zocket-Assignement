import { getChatResponse } from './gemini';

export const getTaskSuggestionChat = getChatResponse;

export const getSuggestions = async (tasks) => {
    try {
        const prompt = `Based on these current tasks: ${JSON.stringify(tasks)}, suggest 3 new tasks that would complement them.`;
        const response = await getChatResponse(prompt);
        
        // Extract suggestions from the response
        const suggestions = response
            .split('Suggested Task:')
            .slice(1)
            .map(suggestion => suggestion.split('\n')[0].trim());
            
        return suggestions;
    } catch (error) {
        console.error('AI Suggestions Error:', error);
        return [];
    }
};
