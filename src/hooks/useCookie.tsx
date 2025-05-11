import { useState } from 'react';
import Cookies from 'js-cookie';

/**
 * useCookie Hook
 * @param key - The name of the cookie.
 * @param initialValue - The initial value of the cookie.
 * @returns An array with [cookieValue, setCookie, removeCookie]
 */
function useCookie(key: string, initialValue: string | undefined) {
  const [cookieValue, setCookieValue] = useState<string | undefined>(() => {
    const storedValue = Cookies.get(key);
    return storedValue ? storedValue : initialValue;
  });

  const setCookie = (value: string | undefined, options = {}) => {
    if (value !== undefined) {
      Cookies.set(key, value, options);
      setCookieValue(value);
    } else {
      removeCookie();
    }
  };

  const removeCookie = () => {
    Cookies.remove(key);
    setCookieValue(undefined);
  };

  return [cookieValue, setCookie, removeCookie];
}

export default useCookie;
