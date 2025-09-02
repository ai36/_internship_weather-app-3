export const toSunriseSunset = (sunrise, sunset, dt) => {
  const now = new Date(dt * 1000);
  const sr = new Date(sunrise * 1000);
  const ss = new Date(sunset * 1000);

  const formatDiff = (from, to) => {
    const diff = Math.abs(to - from);
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff / (1000 * 60)) % 60);
    return `${h}:${m.toString().padStart(2, "0")}`;
  };

  if (now >= sr && now < ss) {
    return {
      sunrise: `Прошло: ${formatDiff(sr, now)}`,
      sunset: `Осталось: ${formatDiff(now, ss)}`,
    };
  } else {
    const nextSunrise =
      now < sr ? sr : new Date(sunrise * 1000 + 24 * 3600 * 1000);
    const prevSunset =
      now >= ss ? ss : new Date(sunset * 1000 - 24 * 3600 * 1000);
    return {
      sunrise: `Осталось: ${formatDiff(now, nextSunrise)}`,
      sunset: `Прошло: ${formatDiff(prevSunset, now)}`,
    };
  }
};
