import { LOCALE_LONG } from "../constants";

export const getForecast = (forecastList, currentDate) => {
  const hourly = forecastList.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString(LOCALE_LONG, {
      hour: "2-digit",
      minute: "2-digit",
    }),
    img: item.weather[0].icon,
    temp: `${Math.round(item.main.temp)}°`,
  }));

  const forecastCountInDay = 8;
  const today = new Date(currentDate * 1000).getDate();
  const newDateIndex = forecastList.findIndex(
    (item) => new Date(item.dt * 1000).getDate() !== today
  );
  const weekForecastList = forecastList.slice(newDateIndex);

  const week = Array.from(
    { length: Math.ceil(weekForecastList.length / forecastCountInDay) },
    (_, i) =>
      weekForecastList.slice(
        i * forecastCountInDay,
        i * forecastCountInDay + forecastCountInDay
      )
  ).map((day) => {
    let maxTemperature = -1000;
    let minTemperature = 1000;
    day.forEach((item) => {
      if (item.main.temp > maxTemperature) maxTemperature = item.main.temp;
      if (item.main.temp < minTemperature) minTemperature = item.main.temp;
    });
    return {
      date: new Date(day[0].dt * 1000).toLocaleDateString(LOCALE_LONG, {
        weekday: "short",
        day: "2-digit",
        month: "short",
      }),
      img: day[0].weather[0].icon,
      temp: `от ${Math.round(minTemperature)}° до ${Math.round(
        maxTemperature
      )}°`,
    };
  });

  return {
    hourly,
    week,
  };
};
