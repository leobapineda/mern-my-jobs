import { ACTIONS } from "./actions";
import { initState } from "./GlobalContext";

export default function reducer(initStateReducer, action) {
  switch (action.type) {
    case ACTIONS.DISPLAY_ALERT:
      return {
        ...initStateReducer,
        showAlert: true,
        alertText: "Please provide all values",
        alertType: "danger",
        isLoading: true,
      };
    case ACTIONS.HIDE_ALERT:
      return {
        ...initStateReducer,
        showAlert: false,
        alertText: "",
        alertType: "",
        isLoading: false,
      };
    case ACTIONS.SETUP_USER_BEGIN:
      return {
        ...initStateReducer,
        isLoading: true,
      };
    case ACTIONS.SETUP_USER_SUCCESS:
      return {
        ...initStateReducer,
        isLoading: false,
        showAlert: true,
        alertText: action.payload.message,
        alertType: "success",
        token: action.payload.token,
        user: action.payload.user,
        jobLocation: action.payload.location,
        userLocation: action.payload.location,
      };
    case ACTIONS.SETUP_USER_ERROR:
      return {
        ...initStateReducer,
        showAlert: true,
        isLoading: false,
        alertText: action.payload.message,
        alertType: "danger",
      };
    case ACTIONS.LOGOUT:
      return {
        ...initState,
        user: null,
        token: null,
        jobLocation: null,
        userLocation: null,
      };
    case ACTIONS.TOGGLE_SIDEBAR:
      return {
        ...initStateReducer,
        showSidebar: !initStateReducer.showSidebar,
      };

    case ACTIONS.UPDATE_USER_BEGIN:
      return {
        ...initStateReducer,
        isLoading: true,
      };
    case ACTIONS.UPDATE_USER_SUCCESS:
      return {
        ...initStateReducer,
        user: action.payload.user,
        token: action.payload.token,
        jobLocation: action.payload.location,
        userLocation: action.payload.location,
        showAlert: true,
        isLoading: true,
        alertText: "Your profile has been updated!",
        alertType: "success",
      };
    case ACTIONS.UPDATE_USER_ERROR:
      return {
        ...initStateReducer,
        showAlert: true,
        isLoading: false,
        alertText: action.payload.message,
        alertType: "danger",
      };

    case ACTIONS.JOB_CREATED_BEGIN:
      return {
        ...initStateReducer,
        isLoading: true,
      };
    case ACTIONS.JOB_CREATED_SUCCESS:
      return {
        ...initStateReducer,
        showAlert: true,
        isLoading: true,
        alertText: "NEW JOB CREATED",
        alertType: "success",
      };
    case ACTIONS.JOB_CREATED_ERROR:
      return {
        ...initStateReducer,
        showAlert: true,
        isLoading: false,
        alertText: action.payload.message,
        alertType: "danger",
      };
    case ACTIONS.GET_JOBS_BEGIN:
      return {
        ...initStateReducer,
        isLoading: true,
        showAlert: false
      };
    case ACTIONS.GET_JOBS_SUCCESS:
      return {
        ...initStateReducer,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };

    default:
      throw new Error(`This action does not exist: ${action.type}`);
  }
}

// GET_JOBS_BEGIN: "GET_JOBS_BEGIN",
//   GET_JOBS_SUCCESS: "GET_JOBS_SUCCESS",