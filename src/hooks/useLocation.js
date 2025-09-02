import { useContext } from "react";
import { LocationContext } from "../providers";

export const useLocation = () => useContext(LocationContext);