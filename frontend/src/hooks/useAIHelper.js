import { useState, useCallback } from 'react';
import axios from 'axios';

const useAIHelper = (apiEndpoint) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [abortController, setAbortController] = useState(new AbortController());

    const sendRequest = useCallback(async (input, options = {}) => {
        setLoading(true);
        setError(null);
        
        // Cancel previous request if it exists
        abortController.abort();
        const newAbortController = new AbortController();
        setAbortController(newAbortController);

        try {
            const result = await axios.post(apiEndpoint, { input }, {
                signal: newAbortController.signal,
                timeout: options.timeout || 10000,
                ...options
            });
            setResponse(result.data);
            return result.data;
        } catch (err) {
            if (!axios.isCancel(err)) {
                setError(err.response?.data?.message || err.message || 'An error occurred');
                throw err;
            }
        } finally {
            setLoading(false);
        }
    }, [apiEndpoint, abortController]);

    const cancelRequest = useCallback(() => {
        abortController.abort();
        setLoading(false);
    }, [abortController]);

    return { 
        loading, 
        error, 
        response, 
        sendRequest,
        cancelRequest,
        reset: () => {
            setResponse(null);
            setError(null);
        }
    };
};

export default useAIHelper;