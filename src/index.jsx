import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/style";
import { App } from "./App";
import {
  ThemeProvider,
  WeatherProvider,
  HistoryProvider,
  LocationProvider,
} from "./providers";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider>
    <HistoryProvider>
      <WeatherProvider>
        <LocationProvider>
          <App />
        </LocationProvider>
      </WeatherProvider>
    </HistoryProvider>
  </ThemeProvider>
);
