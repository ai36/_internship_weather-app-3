import { THEME_LS_KEY, THEME_DARK, THEME_LIGHT } from '../constants';

export const getTheme = () => {
  const savedTheme = localStorage.getItem(THEME_LS_KEY);

  if (savedTheme) return savedTheme;

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_DARK
    : THEME_LIGHT;
};
