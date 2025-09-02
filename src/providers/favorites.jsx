import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FAVORITES_LS_KEY, FAVORITES_MAX } from "../constants";

export const FavoritesContext = createContext({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem(FAVORITES_LS_KEY)) || []
  );

  const addFavorite = useCallback((city) => {
    if (!city || !city.name) return;
    setFavorites((prev) => {
      const exists = prev.some((item) => item.name === city.name);
      const next = exists ? prev : [...prev, city];
      return next.length > FAVORITES_MAX ? next.slice(-FAVORITES_MAX) : next;
    });
  }, []);

  const removeFavorite = useCallback((city) => {
    if (!city || !city.name) return;
    setFavorites((prev) => prev.filter((item) => item.name !== city.name));
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_LS_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      addFavorite,
      removeFavorite,
    }),
    [favorites, addFavorite, removeFavorite]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
