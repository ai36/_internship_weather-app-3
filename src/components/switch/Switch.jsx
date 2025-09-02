import { useCallback, useRef } from "react";
import { Icon } from "components";
import styles from "./switch.module.css";
import { toMs } from "utils/toMs";
import { useTheme, useWeather } from "../../hooks";
import { THEME_DARK, THEME_LIGHT } from "../../constants";

export const Switch = () => {
  const { theme, setTheme } = useTheme();
  const { isPanelOpen } = useWeather();


  const timerRef = useRef(0);
  const doBackgroundTransition = useCallback((callback) => {
    const app = document.querySelector(".app");
    const duration = getComputedStyle(app).getPropertyValue("--transition-duration").trim() || "500ms";
    app.style.transitionDuration = duration;

    callback();

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      app.style.transitionDuration = "0s";
    }, toMs(duration));
  }, []);


  const handleChangeTheme = () => {
    doBackgroundTransition(() => {
      setTheme((prev) => (prev === THEME_DARK ? THEME_LIGHT : THEME_DARK));
    });
  };

  return (
    <label
      className={styles.switch}
      tabIndex={isPanelOpen ? -1 : 0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleChangeTheme();
        }
      }}
      aria-label={`Переключить приложение на ${theme === THEME_DARK ? "светлую" : "темную"} тему`}
      aria-checked={theme === THEME_DARK}
    >
      <Icon className={styles.icon} name="sun" aria-hidden/>
      <Icon className={styles.icon} name="moon" aria-hidden/>
      <input
        className={styles.checkbox}
        disabled={isPanelOpen}
        type="checkbox"
        checked={theme === THEME_DARK}
        tabIndex={-1}
        onChange={handleChangeTheme}
      />
    </label>
  );
};
