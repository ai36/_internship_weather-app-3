import {
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { fetchJson, getHomeTown } from "../utils";
import { useWeather } from "../hooks";
import { TIMEOUT, HOMETOWN_LS_KEY, ERROR } from "../constants";

export const LocationContext = createContext({
  isGeoLocation: false,
  setIsGeoLocation: () => {},
  homeTown: getHomeTown() ?? null,
  setHomeTown: () => {},
  geo: null,
  setGeo: () => {},
  isWaitPermit: false,
  setIsWaitPermit: () => {},
  fetchGeo: async () => null,
});

export const LocationProvider = ({ children }) => {
  const {
    setIsLoading,
    setIsError,
    setIsPanelOpen,
    fetchWeather,
    fetchCity,
    fetchReverseCity,
  } = useWeather();

  const [isGeoLocation, setIsGeoLocation] = useState(false);
  const [homeTown, setHomeTown] = useState(getHomeTown());
  const [geo, setGeo] = useState(null);
  const [isWaitPermit, setIsWaitPermit] = useState(false);

  useEffect(() => {
    fetchWeather(homeTown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.localStorage.setItem(HOMETOWN_LS_KEY, JSON.stringify(homeTown));
  }, [homeTown]);

  const getGeoByIP = useCallback(async () => {
    try {
      const base = "https://ipapi.co/json";
      const data = await fetchJson(base);

      if (!data || !data.latitude || !data.longitude)
        throw new Error(ERROR.GEO_IP_DATA);
      return {
        lat: data.latitude,
        lon: data.longitude,
        name: data.city,
      };
    } catch (error) {
      console.log(error.name === "AbortError" ? ERROR.NETWORK : error);
      return null;
    }
  }, []);

  const getGeoByGPS = useCallback(async () => {
    setIsWaitPermit(true);

    try {
      const gps = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (data) => {
            resolve({
              lat: data.coords.latitude,
              lon: data.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          },
          { enableHighAccuracy: true, maximumAge: 0, timeout: TIMEOUT }
        );
      });

      return gps;
    } catch {
      console.log(ERROR.GEO_GPS_ANSWER);
      return null;
    } finally {
      setIsWaitPermit(false);
    }
  }, []);

  const fetchGeo = useCallback(async () => {
    async function getLocation() {
      if (!("geolocation" in navigator)) {
        const coords = await getGeoByIP();
        if (coords) {
          setGeo(coords);
        } else {
          console.log(ERROR.GEO_DEAD);
        }
        return coords;
      }

      const coords = await getGeoByGPS();
      if (!coords) {
        const ip = await getGeoByIP();
        if (ip) {
          setGeo(ip);
          return ip;
        }
        setIsError(true);
        return null;
      }
      setGeo(coords);
      return coords;
    }

    try {
      if (isGeoLocation) return;
      setIsLoading(true);
      setIsPanelOpen(true);
      setIsGeoLocation(true);

      const location = await getLocation();
      if (!location) {
        setIsError(true);
        return null;
      }
      const geoPos = await fetchReverseCity({
        lat: location.lat,
        lon: location.lon,
      });
      if (!geoPos) {
        setIsError(true);
        return null;
      }
      const city = await fetchCity(geoPos.name, 1);
      return city ?? null;
    } finally {
      setIsLoading(false);
    }
  }, [
    isGeoLocation,
    getGeoByIP,
    getGeoByGPS,
    fetchReverseCity,
    fetchCity,
    setIsError,
    setIsLoading,
    setIsPanelOpen,
  ]);

  const value = useMemo(
    () => ({
      isGeoLocation,
      setIsGeoLocation,
      homeTown,
      setHomeTown,
      geo,
      setGeo,
      isWaitPermit,
      setIsWaitPermit,
      fetchGeo,
    }),
    [isGeoLocation, homeTown, geo, isWaitPermit, fetchGeo]
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};
