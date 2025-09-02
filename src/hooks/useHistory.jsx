import { useContext } from "react";
import { HistoryContext } from "../providers";

export const useHistory = () => useContext(HistoryContext);