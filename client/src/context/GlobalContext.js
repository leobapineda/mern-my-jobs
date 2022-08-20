import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "./reducer";
import { ACTIONS } from "./actions";
export const AppContext = createContext();

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const location = localStorage.getItem("location");

export const initState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  jobLocation: location ,
  userLocation: location ,
};

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);
  // --->>> DISPATCH ACTIONS
  function displayAlert() {
    dispatch({ type: ACTIONS.DISPLAY_ALERT });
    clearAlert();
  }

  function clearAlert() {
    const t = setTimeout(() => {
      dispatch({ type: ACTIONS.HIDE_ALERT });
    }, 3000);
    return () => clearTimeout(t);
  }

  async function registerUser(currentUser) {
    dispatch({ type: ACTIONS.REGISTER_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/register", currentUser);
      const { token, user, location } = data;
      dispatch({
        type: ACTIONS.REGISTER_USER_SUCCESS,
        payload: { token, user, location },
      });
      addUserToLocalStorage(user, token, location);
    } catch (error) {
      // add local storage
      const errorMessage = error.response.data.message;
      dispatch({
        type: ACTIONS.REGISTER_USER_ERROR,
        payload: { msg: errorMessage },
      });
    }
    clearAlert();
  }
  // --->>> DISPATCH ACTIONS

  // --->>> USEEFFECT
    //
  // --->>> USEEFFECT

  // NORMAL FUNCTIONS
  function addUserToLocalStorage(user, token, location) {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  }

  function removeUserFromLocalStorage() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  }
  // NORMAL FUNCTIONS

  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
}

export default GlobalContextProvider;

// al recargar lo primero que hace es poner mis valores de nuevo a cero
// al recargar, buscar mis valores en mi local storage, si hay valores, poner ese valor en mi dispatch
// dentro de un
