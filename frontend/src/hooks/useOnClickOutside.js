import { useEffect } from 'react';

/**
 * Custom hook that triggers a callback when clicking outside of the referenced element
 * @param {React.RefObject} ref - Reference to the element to watch for outside clicks
 * @param {Function} handler - Callback function to execute when clicking outside
 */
export function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]); // Only re-run if ref or handler changes
}