export const toMs = (t) => {
  t = t.trim();
  if (/ms$/.test(t)) return parseFloat(t);
  if (/s$/.test(t)) return parseFloat(t) * 1000;
  return 500;
};
