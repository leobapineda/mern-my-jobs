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
      };
    case ACTIONS.HIDE_ALERT:
      return {
        ...initStateReducer,
        showAlert: false,
        alertText: "",
        alertType: "",
        isLoading: false,
      };
    case ACTIONS.REGISTER_USER_BEGIN:
      return {
        ...initStateReducer,
        isLoading: true,
      };
    case ACTIONS.REGISTER_USER_SUCCESS:
      return {
        ...initStateReducer,
        isLoading: false,
        showAlert: true,
        alertText: `Welcome ${action.payload.user.name}! Redirecting...`,
        alertType: "success",
        token: action.payload.token,
        user: action.payload.user,
        // location
        jobLocation: action.payload.location,
        userLocation: action.payload.location,
        // location
      };
    case ACTIONS.REGISTER_USER_ERROR:
      return {
        ...initStateReducer,
        showAlert: true,
        alertText: action.payload.msg,
        alertType: "danger",
      };
    case "LOCAL":
      return {
        ...initState,
        user: action.payload.user,
        token: action.payload.token,
        jobLocation: action.payload.location,
        userLocation: action.payload.location,
      };
    default:
      throw new Error(`This action does not exist: ${action.type}`);
  }
}
