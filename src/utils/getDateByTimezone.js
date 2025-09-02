import { LOCALE_LONG } from "../constants";

export const getDateByTimezone = (timezone = 0, unixTime = Date.now() / 1000) => {
  const targetMs = (unixTime + timezone) * 1000;

  return new Intl.DateTimeFormat(LOCALE_LONG, {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(targetMs);
};
