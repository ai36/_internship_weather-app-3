import { useContext } from "react";
import { WeatherContext } from "../providers";

export const useWeather = () => useContext(WeatherContext);
