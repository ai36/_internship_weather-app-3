import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { HISTORY_LS_KEY, HISTORY_MAX } from "../constants";

export const HistoryContext = createContext({
  history: [],
  addHistoryItem: () => {},
  clearHistory: () => {},
});

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem(HISTORY_LS_KEY)) || []
  );

  const addHistoryItem = useCallback((city) => {
    if (!city || !city.name) return;
    setHistory((prev) => {
      const next = prev.filter((item) => item.name !== city.name);
      return next.length > HISTORY_MAX ? next : [...next, city];
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  useEffect(() => {
    localStorage.setItem(HISTORY_LS_KEY, JSON.stringify(history));
  }, [history]);

  const value = useMemo(
    () => ({
      history,
      addHistoryItem,
      clearHistory,
    }),
    [history, addHistoryItem, clearHistory]
  );

  return (
    <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>
  );
};
