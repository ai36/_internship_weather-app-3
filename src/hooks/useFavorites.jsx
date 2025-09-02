import { useContext } from "react";
import { FavoritesContext } from "../providers";

export const useFavorites = () => useContext(FavoritesContext);