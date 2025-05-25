import { useMemo } from 'react';

export const useValidateNumber = (num: string | number, size = 2) => {
  return useMemo(() => {
    if (!num) return 0;
    return parseFloat(Number(num).toFixed(size));
  }, [num, size]);
};
