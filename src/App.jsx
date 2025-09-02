import { clsx } from "./utils";
import { Header, Main, Footer } from "./components";
import { useWeather } from "./hooks";

export const App = () => {
  const { isPanelOpen } = useWeather();

  return (
    <div className="app">
      <div className={clsx("content", isPanelOpen && "panelOpened")}>
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
}
