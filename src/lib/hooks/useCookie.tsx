import { useState } from 'react';
import Cookies from 'js-cookie';

/**
 * useCookie Hook
 * @param key - The name of the cookie.
 * @param initialValue - The initial value of the cookie.
 * @returns An array with [cookieValue, setCookie, removeCookie]
 */
function useCookie(key: string, initialValue: string | undefined) {
  // Retrieve the cookie value if available, otherwise use the initial value
  const [cookieValue, setCookieValue] = useState<string | undefined>(() => {
    const storedValue = Cookies.get(key);
    return storedValue ? storedValue : initialValue;
  });

  // Set the cookie with an optional expiration time
  const setCookie = (value: string | undefined, options = {}) => {
    if (value !== undefined) {
      Cookies.set(key, value, options); // Set the cookie only if the value is not undefined
      setCookieValue(value); // Update the state with the new cookie value
    } else {
      removeCookie(); // Remove the cookie if value is undefined
    }
  };

  // Remove the cookie
  const removeCookie = () => {
    Cookies.remove(key);
    setCookieValue(undefined); // Clear the state when cookie is removed
  };

  return [cookieValue, setCookie, removeCookie];
}

export default useCookie;
