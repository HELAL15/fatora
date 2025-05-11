import { useState, useEffect } from 'react';

/**
 * useDebounce Hook
 * @param value - The value to be delayed before updating.
 * @param delay - The delay time in milliseconds.
 * @returns The value after the specified delay.
 */
function useDebounce(value: undefined, delay: number): undefined {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: If the value changes before the delay ends, clear the previous timeout
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run the effect if value or delay changes

  return debouncedValue; // Return the debounced value
}

export default useDebounce;
