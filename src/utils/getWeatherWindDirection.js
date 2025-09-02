import { DIRECTIONS } from "../constants";

export const getWeatherWindDirection = (value) => {
  if(typeof value === "number") {
    return DIRECTIONS[Math.round((value + 180) / 45) % 8];
  }

  if(typeof value === "string") {
    const deg = DIRECTIONS.indexOf(value)
    return deg < 0 ? null : DIRECTIONS.indexOf(value) * 45 + 45 + 180;
  }

  return null;
};
