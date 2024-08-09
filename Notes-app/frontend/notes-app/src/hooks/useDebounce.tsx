import React, { useCallback } from "react";
import { debounce } from "lodash";

const useDebounce = <T extends (...args: any[]) => any>(callback: T, delay: number) => {
  const deboucedCallback = useCallback(
    debounce((...args) => {
      callback(...args);
    }, delay),
    [callback, delay]
  );

  return deboucedCallback;
};

export default useDebounce;
