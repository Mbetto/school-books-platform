import { useState, useEffect, useRef } from 'react';

const useDebounce = (value, delay, options = {}) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    const timeoutRef = useRef(null);
    const { leading = false, maxWait } = options;
    const maxWaitRef = useRef(null);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
            clearTimeout(timeoutRef.current);
            clearTimeout(maxWaitRef.current);
        };
    }, []);

    useEffect(() => {
        if (leading && timeoutRef.current === null) {
            setDebouncedValue(value);
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (isMounted.current) {
                setDebouncedValue(value);
            }
            timeoutRef.current = null;
        }, delay);

        if (maxWait && !maxWaitRef.current) {
            maxWaitRef.current = setTimeout(() => {
                if (isMounted.current) {
                    setDebouncedValue(value);
                }
                maxWaitRef.current = null;
            }, maxWait);
        }

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [value, delay, leading, maxWait]);

    return debouncedValue;
};

export default useDebounce;