import { useRef } from "react";
import { clsx } from "../../utils";
import styles from "./weatherSearch.module.css";
import { Dropdown, Input, Switch } from "..";
import {
  useWeather,
  useClickOutside,
  useDebounce,
  useLocation,
} from "../../hooks";
import { FavoritesProvider } from "../../providers";
import { ERROR, INPUT_MIN_LENGTH, INPUT_REGEX, INPUT_DEBOUNCE_DELAY } from "../../constants";

export const WeatherSearch = ({ className }) => {
  const {
    fetchCity,
    fetchWeather,
    inputValue,
    setInputValue,
    isLoading,
    isPanelOpen,
    setIsPanelOpen,
    setIsShowCityList,
    setCityList,
    setCityInfo,
  } = useWeather();

  const { setIsGeoLocation } = useLocation();

  const inputRef = useRef(null);

  const rl = () => {
    setIsShowCityList(false);
    setCityInfo(undefined);
    setCityList([]);
  };

  const containerRef = useRef(null);
  useClickOutside(containerRef, () => {
    setIsPanelOpen(false);
    setIsShowCityList(false);
    setCityList([]);
    setIsGeoLocation(false);
  });

  useDebounce(inputValue, {
    delay: INPUT_DEBOUNCE_DELAY,
    minLength: INPUT_MIN_LENGTH,
    onDebounced: (q) => {
      setIsShowCityList(true);
      fetchCity(q);
    },
  });

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setIsPanelOpen(true);
      rl();
      setInputValue("");
      return;
    }

    if (INPUT_REGEX.test(newValue)) {
      setInputValue(newValue);

      if (newValue.length < INPUT_MIN_LENGTH) {
        rl();
      }
    } else {
      inputRef.current?.setCustomValidity(ERROR.INPUT_NOT_AVAILABLE);
      inputRef.current?.reportValidity();
      inputRef.current?.setCustomValidity("");
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (isLoading) return;

    if (inputValue.trim().length < INPUT_MIN_LENGTH) {
      inputRef.current?.setCustomValidity(ERROR.INPUT_TOO_SHORT);
      inputRef.current?.reportValidity();
      inputRef.current?.setCustomValidity("");
      return;
    }

    rl();
    fetchCity(inputValue, 1);
    handleReset();
  };

  const handleItemClick = (city) => {
    setInputValue("");
    fetchWeather(city);
    setIsPanelOpen(false);
  };

  const handleItemClickInCityList = (city) => {
    const newValue = city.name.trim();
    if (isLoading) return;

    setInputValue(newValue);
    handleSubmit();
  };

  const handleReset = () => {
    setIsPanelOpen(true);
    rl();

    setInputValue("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleFocus = (e) => {
    setIsPanelOpen(true);
    const newValue = e.target.value;
    if (newValue.length < INPUT_MIN_LENGTH) {
      setCityInfo(undefined);
    } else {
      setIsShowCityList(true);
      fetchCity(newValue);
    }
  };

  return (
    <div className={clsx(styles.container, className)} ref={containerRef}>
      <form
        id="searchForm"
        className={clsx(styles.form, isPanelOpen ? styles.isPanelOpen : "")}
        onSubmit={handleSubmit}
        onReset={(e) => {
          e.preventDefault();
          handleReset();
        }}
        noValidate
      >
        <Input
          className={styles.search}
          type="search"
          placeholder="Поиск по городу"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          ref={inputRef}
        />
        <Switch />
      </form>
      <FavoritesProvider>
        <Dropdown
          onItemClick={handleItemClick}
          onItemClickInCityList={handleItemClickInCityList}
        />
      </FavoritesProvider>
    </div>
  );
};
