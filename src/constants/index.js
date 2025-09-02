export const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
export const TIMEOUT = 5000;
export const AUTO_UPDATE_INTERVAL = 15 * 60 * 1000;
export const LOCALE_SHORT = "ru";
export const LOCALE_LONG = "ru-RU";

export const THEME_LS_KEY = "theme";
export const THEME_DARK = "dark";
export const THEME_LIGHT = "light";

export const HOMETOWN_LS_KEY = "homeTown";
export const DEFAULT_CITY = {
  name: "Москва",
  lat: "55.6255780",
  lon: "37.6063916",
};

export const HISTORY_LS_KEY = "history";
export const HISTORY_MAX = 5;

export const FAVORITES_LS_KEY = "favorites";
export const FAVORITES_MAX = 5;

export const BACKGROUND_IMAGES = {
  "01": "clear-sky",
  "02": "few-clouds",
  "03": "scattered-clouds",
  "04": "broken-clouds",
  "09": "shower-rain",
  "10": "rain",
  "11": "thunderstorm",
  "13": "snow",
  "50": "mist",
};

export const DIRECTIONS = [
  "Северный",
  "Северо-восточный",
  "Восточный",
  "Юго-восточный",
  "Южный",
  "Юго-западный",
  "Западный",
  "Северо-западный",
];

export const APP_RELOAD = () => {
  window.location.reload();
};

export const TABS_LIST = {
  hourly: "на 24 часа",
  week: "на 5 дней",
}

export const ERROR = {
  NETWORK: "Отсутствует связь со сторонним сервисом",
  FAIL: "Запрос завершен с ошибкой",
  GEO_IP_DATA: "Сервер IP не вернул данные или они не содержат географических координат",
  GEO_GPS_ANSWER: "Датчик геолокации не отвечает или нет разрешения на его использование",
  GEO_DEAD: "Попытка определения геопозиции завершилась безуспешно",
  INPUT_NOT_AVAILABLE: "Допустимо вводить только кириллические символы, пробелы и дефисы",
  INPUT_TOO_SHORT: "Введите не менее трех символов",
}

export const INPUT_MIN_LENGTH = 3;
export const INPUT_REGEX = /^[а-яё-\s]+$/i;
export const INPUT_DEBOUNCE_DELAY = 1000;
