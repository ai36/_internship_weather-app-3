export const updateInputWidth = (ref) => {
  const elem = ref?.current;
  if (!elem) return;

  const width = elem.getBoundingClientRect().width;
  const next = Number(width.toFixed(6));
  const prev = Number(elem.style.getPropertyValue("--input-width")) || 0;

  if (Math.abs(prev - next) > 0.1) {
    elem.style.setProperty("--input-width", String(next));
  }
};
