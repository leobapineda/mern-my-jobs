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
  initialJobLocation: location,
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
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
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
    }, 2000);
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

  async function getJobs(name, value) {
    const { search, searchStatus, searchType, sort, page } = state;
   
    const query = {
      search: search,
      searchStatus: searchStatus,
      searchType: searchType,
      sort: sort,
      [name]: value,
    };

    const url = `/jobs?search=${query.search}&status=${query.searchStatus}&jobType=${query.searchType}&sort=${query.sort}&page=${page}`;
    dispatch({
      type: ACTIONS.FILTER_JOBS,
      payload: { name, value },
    });

    dispatch({ type: ACTIONS.GET_JOBS_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { totalJobs, numOfPages, jobs } = data;
      dispatch({
        type: ACTIONS.GET_JOBS_SUCCESS,
        payload: { totalJobs, numOfPages, jobs, name, value },
      });
    } catch (error) {
      logoutUser();
    }
    // ya no es necesario limpiar la alert, lo hacemos en el reducer con las acciones de GET_JOBS_BEGIN y GET_JOBS_SUCCESS
    // clearAlert();
    //=======================> DESDE AQUI COMENTE TODO
  }

  function changePage(number) {
    dispatch({
      type: ACTIONS.CHANGE_PAGE,
      payload: number,
    });
  }

  async function deleteJob(id) {
    dispatch({
      type: ACTIONS.DELETE_JOBS_BEGIN,
    });
    try {
      await authFetch.delete(`/jobs/${id}`);
      getJobs();
    } catch (error) {
      logoutUser();
    }
  }

  function setEditJob(id) {
    dispatch({
      type: ACTIONS.SET_EDIT_JOB,
      payload: { id },
    });
  }

  async function editJob(jobInfo) {
    try {
      await authFetch.patch(`/jobs/${jobInfo.editJobId}`, jobInfo);
      dispatch({
        type: ACTIONS.EDIT_JOB_SUCCESS,
      });
    } catch (error) {
      if (error?.response?.status === 401) return;
      const message =
        error?.response?.data || "Oops, can not create job, try again later";
      dispatch({
        type: ACTIONS.EDIT_JOB_ERROR,
        payload: message,
      });
    }
    clearAlert();
  }

  function cancelEditJob() {
    dispatch({
      type: ACTIONS.EDIT_JOB_CANCEL,
    });
  }

  async function showStats() {
    dispatch({
      type: ACTIONS.SHOW_STATS_BEGIN,
    });
    try {
      const { data } = await authFetch.get(`/jobs/stats`);
      dispatch({
        type: ACTIONS.SHOW_STATS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      logoutUser()
    }
  }

  async function clearFilters() {
    dispatch({
      type: ACTIONS.CLEAR_FILTERS,
    });
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
        clearAlert,
        setEditJob,
        deleteJob,
        editJob,
        cancelEditJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default GlobalContextProvider;
