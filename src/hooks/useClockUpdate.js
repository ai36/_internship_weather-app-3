import { useEffect, useRef, useState } from "react";
import { getTimeByTimezone } from "../utils";

export function useClockUpdate(timezone, paused) {
  const [tick, setTick] = useState(0);
  const timeoutId = useRef(null);
  const intervalId = useRef(null);

  useEffect(() => {
    if (paused || timezone == null) return () => {};

    clearTimeout(timeoutId.current);
    clearInterval(intervalId.current);

    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    timeoutId.current = setTimeout(() => {
      setTick(t => t + 1);
      intervalId.current = setInterval(() => {
        setTick(t => t + 1);
      }, 60 * 1000);
    }, Math.max(0, msToNextMinute));

    return () => {
      clearTimeout(timeoutId.current);
      clearInterval(intervalId.current);
    };
  }, [paused, timezone]);

  const text = timezone ? getTimeByTimezone(timezone) : "";

  return { text, tick };
}