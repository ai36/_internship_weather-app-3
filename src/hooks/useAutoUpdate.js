import { useEffect } from "react";
import { AUTO_UPDATE_INTERVAL } from "../constants";

export const useAutoUpdate = (lastCityRef, callback) => {
  useEffect(() => {
    if (!lastCityRef.current) return;

    let inactivityTimer;
    let autoUpdateTimer;

    const startLoop = () => {
      callback(lastCityRef.current);

      autoUpdateTimer = setInterval(() => {
        callback(lastCityRef.current);
      }, AUTO_UPDATE_INTERVAL);
    };

    const resetTimers = () => {
      clearTimeout(inactivityTimer);
      clearInterval(autoUpdateTimer);

      inactivityTimer = setTimeout(startLoop, AUTO_UPDATE_INTERVAL);
    };

    const events = ["mousemove", "keydown", "click", "scroll"];
    events.forEach((e) => window.addEventListener(e, resetTimers));

    resetTimers();

    return () => {
      clearTimeout(inactivityTimer);
      clearInterval(autoUpdateTimer);
      events.forEach((e) => window.removeEventListener(e, resetTimers));
    };
  }, [callback, lastCityRef]);
};
