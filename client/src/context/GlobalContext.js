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
  userLocation: location,
  showSidebar: false,
  jobLocation: location,
  // JOB VALUES
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["pending", "interview", "declined"],
  status: "pending",
  // GET ALL JOBS
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
};

function GlobalContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  // AXIOS SETUP
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // interceptamo la respuesta antes de enviarla por nuestro componente y aqui podemos ejecutar algo, en mi caso si se recibe un error 401, hacemos log out
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        const { message } = error?.response?.data;
        dispatch({
          type: ACTIONS.UPDATE_USER_ERROR,
          payload: { message: `${message}. Please login again.` },
        });
        setTimeout(() => {
          logoutUser();
        }, 2000);
      }
      return Promise.reject(error);
    }
  );
  // AXIOS SETUP

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

  async function setUpUser({ currentUser, endPoint, alertMessage }) {
    dispatch({ type: ACTIONS.SETUP_USER_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/auth/${endPoint}`,
        currentUser
      );
      const { token, user, location } = data;
      dispatch({
        type: ACTIONS.SETUP_USER_SUCCESS,
        payload: { token, user, location, message: alertMessage },
      });
      addUserToLocalStorage(user, token, location);
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      dispatch({
        type: ACTIONS.SETUP_USER_ERROR,
        payload: { message: errorMessage },
      });
    }
    clearAlert();
  }

  function toogleSidebar() {
    dispatch({ type: ACTIONS.TOGGLE_SIDEBAR });
  }

  function logoutUser() {
    dispatch({ type: ACTIONS.LOGOUT });
    removeUserFromLocalStorage();
  }

  async function updateUser(currentUser) {
    dispatch({
      type: ACTIONS.UPDATE_USER_BEGIN,
    });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      // console.log(data);
      const { user, token, location } = data;
      dispatch({
        type: ACTIONS.UPDATE_USER_SUCCESS,
        payload: { user, token, location },
      });
      addUserToLocalStorage(user, token, location);
    } catch (error) {
      if (error.response.status === 401) return;
      const message =
        error?.response?.data || "Oops, something went wrong, try again later";
      dispatch({
        type: ACTIONS.UPDATE_USER_ERROR,
        payload: message,
      });
    }
    clearAlert();
  }
  
  async function createJob(currentJobInfo) {
    dispatch({
      type: ACTIONS.JOB_CREATED_BEGIN,
    });
    try {
      await authFetch.post("/jobs", currentJobInfo);
      dispatch({
        type: ACTIONS.JOB_CREATED_SUCCESS,
      });
    } catch (error) {
      if (error?.response?.status === 401) return;
      const message =
        error?.response?.data || "Oops, can not create job, try again later";
      dispatch({
        type: ACTIONS.JOB_CREATED_ERROR,
        payload: message,
      });
    }
    clearAlert();
  }

  async function getJobs() {
    // llamada a mi api, y dispatch actions
    dispatch({type: ACTIONS.GET_JOBS_BEGIN})
    try {
      const { data } = await authFetch("/jobs")
      const {totalJobs, numOfPages, jobs} = data;
      console.log(data);
    dispatch({ type: ACTIONS.GET_JOBS_SUCCESS, payload : {totalJobs, numOfPages, jobs} });

    } catch (error) {
        console.log(error);
    }
  }
  // --->>> DISPATCH ACTIONS

  // --->>> USEEFFECT
  //nothing yet
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
  // console.log("global context");
  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setUpUser,
        logoutUser,
        toogleSidebar,
        updateUser,
        createJob,
        getJobs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default GlobalContextProvider;
