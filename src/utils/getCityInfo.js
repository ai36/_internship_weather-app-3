export const getCityInfo = (raw, fallback) => {
  return {
    name:
      fallback ||
      raw.address.city ||
      raw.address.town ||
      raw.address.village ||
      raw.address.hamlet ||
      raw.display_name.split(", ")[0],
    lat: raw.lat,
    lon: raw.lon,
  };
};
