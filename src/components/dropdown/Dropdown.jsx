import { clsx } from "../../utils";
import styles from "./dropdown.module.css";
import {
  Loader,
  History,
  SearchResult,
  Favorites,
  CityList,
  TryAgain,
  Location,
} from "..";
import { useLocation, useWeather } from "../../hooks";

export const Dropdown = ({ onItemClick, onItemClickInCityList }) => {
  const {
    fetchCity,
    isLoading,
    isError,
    isPanelOpen,
    isShowCityList,
    cityInfo,
    queryCity,
  } = useWeather();
  const { fetchGeo, isGeoLocation } = useLocation();

  const handleTryAgain = () => {
    if (queryCity) {
      fetchCity(queryCity, 1);
    } else {
      fetchGeo();
    }
  };

  const renderContent = () => {
    if (isLoading && !isShowCityList) return <Loader />;
    if (isError)
      return <TryAgain variant="dropdown" onClick={handleTryAgain} />;
    if (isGeoLocation) return <Location onItemClick={onItemClick} />;
    if (isShowCityList) {
      return <CityList onItemClickInCityList={onItemClickInCityList} />;
    }
    if (cityInfo === undefined) {
      return (
        <>
          <Favorites onItemClick={onItemClick} />
          <History onItemClick={onItemClick} />
        </>
      );
    }
    return <SearchResult onItemClick={onItemClick} />;
  };

  return (
    <div className={clsx(styles.container, isPanelOpen && styles.visible)}>
      {renderContent()}
    </div>
  );
};
