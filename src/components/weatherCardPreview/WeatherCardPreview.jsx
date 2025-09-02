import { TryAgain, WeatherCard, WeatherCardSkeleton } from "..";
import { useWeather, useWeatherPreview } from "../../hooks";

export const WeatherCardPreview = ({ city, onItemClick, favoriteControl }) => {
  const { isLoading, isWaitPermit } = useWeather();
  const { isPreviewLoading, isPreviewError, preview, fetchPreview } =
    useWeatherPreview(city);

  const renderContent = () => {
    if (isPreviewLoading || isWaitPermit || isLoading)
      return <WeatherCardSkeleton />;
    if (isPreviewError)
      return <TryAgain variant="dropdownList" onClick={fetchPreview} />;
    return (
      <WeatherCard
        city={city}
        onItemClick={onItemClick}
        preview={preview}
        favoriteControl={favoriteControl}
      />
    );
  };

  return renderContent();
};
