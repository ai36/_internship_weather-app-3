import { HOMETOWN_LS_KEY, DEFAULT_CITY } from "../constants";

export const getHomeTown = () => {
  const savedHomeTown = localStorage.getItem(HOMETOWN_LS_KEY);

  if (savedHomeTown) return JSON.parse(savedHomeTown);

  return DEFAULT_CITY;
};
