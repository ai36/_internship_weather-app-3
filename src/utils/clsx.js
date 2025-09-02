export const clsx = ( ...classNames ) => {
  const classesList = [...classNames].filter((item) => item);
  return classesList.filter(Boolean).join(' ');
};
