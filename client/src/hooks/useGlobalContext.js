import { useContext } from "react";
import { AppContext } from "../context/GlobalContext";
export function useGlobalContext() {
  return useContext(AppContext);
}
