import { useState, useEffect, useCallback } from 'react';

const useLocalStorage = (key, initialValue, options = {}) => {
    const { 
        serialize = JSON.stringify, 
        deserialize = JSON.parse,
        listenToStorageChanges = true
    } = options;

    const readValue = useCallback(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? deserialize(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    }, [key, initialValue, deserialize]);

    const [storedValue, setStoredValue] = useState(readValue);

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, serialize(valueToStore));
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, storedValue, serialize]);

    useEffect(() => {
        if (!listenToStorageChanges) return;

        const handleStorageChange = (event) => {
            if (event.key === key && event.newValue !== serialize(storedValue)) {
                setStoredValue(readValue());
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key, storedValue, serialize, readValue, listenToStorageChanges]);

    return [storedValue, setValue];
};

export default useLocalStorage;