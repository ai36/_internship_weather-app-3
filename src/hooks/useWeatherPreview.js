import { useCallback, useEffect, useState } from "react";
import { fetchJson } from "../utils";
import { API_KEY, ERROR } from "../constants";

export const useWeatherPreview = (city) => {
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isPreviewError, setIsPreviewError] = useState(false);
  const [preview, setPreview] = useState(null);

  const fetchPreview = useCallback(async () => {
    if (!city?.lat || !city?.lon) {
      setPreview(null);
      setIsPreviewLoading(false);
      setIsPreviewError(false);
      return;
    }

    try {
      setIsPreviewLoading(true);
      setIsPreviewError(false);

      const base = "https://api.openweathermap.org/data/2.5";
      const params = `lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric&lang=ru`;
      const weatherData = await fetchJson(`${base}/weather?${params}`);

      setPreview({
        name: city.name || weatherData?.name || "",
        lat: weatherData?.coord?.lat ?? city.lat,
        lon: weatherData?.coord?.lon ?? city.lon,
        temperature: Number(weatherData?.main?.temp).toFixed(0),
        timezone: weatherData?.timezone ?? null,
        feel: weatherData?.weather?.[0]?.description ?? "",
        icon: weatherData?.weather?.[0]?.icon,
      });
    } catch (error) {
      console.log(error.name === "AbortError" ? error : ERROR.FAIL);
      setIsPreviewError(true);
      setPreview(null);
    } finally {
      setIsPreviewLoading(false);
    }
  }, [city]);

  useEffect(() => {
    fetchPreview();
  }, [fetchPreview]);

  return { isPreviewLoading, isPreviewError, preview, fetchPreview };
};
