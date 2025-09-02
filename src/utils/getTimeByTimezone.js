import { LOCALE_LONG } from "../constants";

export const getTimeByTimezone = (timezone = 0, unixTime = Date.now() / 1000) => {
  const targetMs = (unixTime + timezone) * 1000;

  return new Intl.DateTimeFormat(LOCALE_LONG, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  }).format(targetMs);
};
