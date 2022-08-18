import React, { createContext, useReducer } from "react";
import reducer from "./reducer";
import { ACTIONS } from "./actions";
export const AppContext = createContext();

export const initState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
};

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  // --->>> DISPATCH ACTIONS
  function displayAlert() {
    dispatch({ type: ACTIONS.DISPLAY_ALERT });
    clearAlert();
  }

  function clearAlert() {
    // if (state.showAlert === true) return;
    const t = setTimeout(() => {
      dispatch({ type: ACTIONS.HIDE_ALERT });
    }, 3000);
    return () => clearTimeout(t);
  }
  // --->>> DISPATCH ACTIONS

  // mientras mi estado esta mostrando la alerta, no puedes seguir dando clicl
  console.log("GlobalContext");
  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {children}
    </AppContext.Provider>
  );
}

export default GlobalContextProvider;
