import { createContext, useCallback, useMemo, useRef, useState } from "react";
import { getWeatherData, getForecast, getCityInfo, fetchJson } from "../utils";
import { useAutoUpdate, useHistory } from "../hooks";
import { API_KEY, LOCALE_SHORT, ERROR } from "../constants";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const { addHistoryItem } = useHistory();

  const [data, setData] = useState({
    details: {},
    current: {},
    forecast: { hourly: Array(8).fill(null), week: Array(5).fill(null) },
  });

  const [queryCity, setQueryCity] = useState(null);
  const [cityInfo, setCityInfo] = useState(undefined);
  const [inputValue, setInputValue] = useState("");
  const [isShowCityList, setIsShowCityList] = useState(false);
  const [cityList, setCityList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const fetchWeather = useCallback(async (city) => {
    try {
      setIsLoading(true);
      setIsError(false);

      lastCityRef.current = city;

      const base = "https://api.openweathermap.org/data/2.5";
      const params = `lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=${LOCALE_SHORT}`;
      const [weatherData, forecastData] = await Promise.all([
        fetchJson(`${base}/weather?${params}`),
        fetchJson(`${base}/forecast?${params}`),
      ]);

      const weather = getWeatherData({
        ...weatherData,
        name: city?.name || weatherData.name,
      });
      const forecast = getForecast(forecastData.list, weatherData.dt);

      setData({ ...weather, forecast });
    } catch (error) {
      console.log(error.name === "AbortError" ? error : ERROR.FAIL);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchCity = useCallback(
    async (query = "", limit) => {
      const limitParam = limit ? `&limit=${limit}` : "&limit=100";
      setQueryCity(query);

      try {
        setIsLoading(true);
        setIsError(false);

        const base = "https://nominatim.openstreetmap.org";
        const params = `q=${encodeURIComponent(
          query
        )}&format=json&addressdetails=1${limitParam}&accept-language=${LOCALE_SHORT}`;
        const cityData = await fetchJson(`${base}/search.php?${params}`);

        if (cityData[0] && limit === 1) {
          const newCityInfo = getCityInfo(cityData[0], cityData.name);
          setCityInfo(newCityInfo);
          addHistoryItem(newCityInfo);
          return newCityInfo;
        } else if (cityData[0] && !limit) {
          setCityInfo(null);
          const placeOnly = cityData.filter((item) => item?.class === "place");
          setCityList(placeOnly);
          if (placeOnly.length === 0) setIsShowCityList(false);
        } else {
          setIsShowCityList(false);
          setCityList([]);
          setCityInfo(null);
        }
      } catch (error) {
        console.log(error.name === "AbortError" ? error : ERROR.FAIL);
        setIsError(true);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [addHistoryItem]
  );

  const fetchReverseCity = useCallback(async ({ lat, lon }) => {
    try {
      setIsLoading(true);
      setIsError(false);

      const base = "https://nominatim.openstreetmap.org";
      const params = `lat=${lat}&lon=${lon}&format=json&accept-language=${LOCALE_SHORT}`;
      const cityData = await fetchJson(`${base}/reverse?${params}`);

      return getCityInfo(cityData);
    } catch (error) {
      console.log(error.name === "AbortError" ? error : ERROR.FAIL);
      setIsError(true);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const lastCityRef = useRef(null);
  useAutoUpdate(lastCityRef, fetchWeather);

  const value = useMemo(
    () => ({
      data,
      fetchWeather,
      fetchCity,
      fetchReverseCity,
      queryCity,
      setQueryCity,
      cityInfo,
      setCityInfo,
      inputValue,
      setInputValue,
      cityList,
      setCityList,
      isShowCityList,
      setIsShowCityList,
      isLoading,
      setIsLoading,
      isError,
      setIsError,
      isPanelOpen,
      setIsPanelOpen,
    }),
    [
      data,
      queryCity,
      cityInfo,
      inputValue,
      cityList,
      isShowCityList,
      isLoading,
      isError,
      isPanelOpen,
      fetchWeather,
      fetchCity,
      fetchReverseCity,
    ]
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
};
