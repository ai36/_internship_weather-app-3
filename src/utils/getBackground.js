import { BACKGROUND_IMAGES } from "../constants";

export const getBackground = (id) => {
  if (!id) return null;

  const backgroundImage = BACKGROUND_IMAGES[id.slice(0, 2)];
  if (backgroundImage) return backgroundImage;
};
