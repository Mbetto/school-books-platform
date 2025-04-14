export const fetchAIResponse = async (prompt) => {
    try {
        const response = await fetch('/api/ai-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch AI response');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        throw error;
    }
};