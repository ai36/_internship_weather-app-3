import humidityIcon from "../assets/img/humidity.svg";
import barometrIcon from "../assets/img/barometr.svg";
import visibilityIcon from "../assets/img/visibility.svg";
import sunriseIcon from "../assets/img/sunrise.svg";
import sunsetIcon from "../assets/img/sunset.svg";
import directionIcon from "../assets/img/direction.svg";
import { getBackground, getTimeByTimezone, getDateByTimezone, toSunriseSunset, toMmOfMercury, getWeatherWindDirection } from "../utils";

export const getWeatherData = ({ name, main, visibility, wind, sys, dt, weather, timezone }) => {

  const pressureMm = toMmOfMercury(main.pressure);
  const visibilityKm = visibility / 1000;

  const current = {
    city: name,
    date: getDateByTimezone(timezone),
    time: getTimeByTimezone(timezone),
    timezone: timezone,
    temperature: main.temp.toFixed(0),
    icon: weather[0].icon,
    description: weather[0].description,
    feelsLike: main.feels_like.toFixed(0),
  };

  const details = [
    {
      title: "Влажность",
      img: humidityIcon,
      value: main.humidity.toFixed(0),
      pbValue: main.humidity.toFixed(0),
      units: "%",
      min: 0,
      max: 100,
    },
    {
      title: "Давление",
      img: barometrIcon,
      value: pressureMm,
      pbValue: (pressureMm - 700).toFixed(0),
      gradientPb: true,
      description:
        pressureMm >= 740 && pressureMm <= 760
          ? "Нормальное"
          : pressureMm < 740
          ? "Пониженное"
          : "Повышенное",
    },
    {
      title: "Видимость",
      img: visibilityIcon,
      value: visibilityKm.toFixed(0),
      pbValue: visibilityKm * 10,
      units: "км",
      description:
      visibilityKm >= 3 && visibilityKm <= 6
      ? "Нормальная"
      : visibilityKm < 3
      ? "Низкая"
      : "Высокая",
    },
    {
      title: "Рассвет",
      img: sunriseIcon,
      value: getTimeByTimezone(timezone, sys.sunrise),
      description: toSunriseSunset(sys.sunrise, sys.sunset, dt).sunrise,
    },
    {
      title: "Закат",
      img: sunsetIcon,
      value: getTimeByTimezone(timezone, sys.sunset),
      description: toSunriseSunset(sys.sunrise, sys.sunset, dt).sunset,
    },
    {
      title: "Сила ветра",
      img: directionIcon,
      value: wind.speed.toFixed(0) < 1 ? "‹ 1" : wind.speed.toFixed(0),
      units: "м/с",
      description: getWeatherWindDirection(wind.deg),
    },
  ];

  document.documentElement.dataset.bg = getBackground(weather[0].icon);

  return { details, current };
};
