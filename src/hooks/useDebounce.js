import { useEffect, useRef, useState } from "react";

export const useDebounce = (
  value,
  { delay = 1000, minLength = 3, onDebounced } = {}
) => {
  const [debounced, setDebounced] = useState(value);
  const timerRef = useRef(null);

  const cbRef = useRef(onDebounced);
  useEffect(() => {
    cbRef.current = onDebounced;
  }, [onDebounced]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    const str = (value ?? "").trim();
    if (str.length < minLength) {
      return;
    }

    timerRef.current = setTimeout(() => {
      setDebounced(str);
      if (typeof cbRef.current === "function") {
        cbRef.current(str);
      }
    }, delay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [value, delay, minLength]);

  return debounced;
};
