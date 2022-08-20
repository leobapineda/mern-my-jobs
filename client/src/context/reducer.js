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
    // case ACTIONS.REGISTER_USER_BEGIN:
    //   return {
    //     ...initStateReducer,
    //     isLoading: true,
    //   };
    // case ACTIONS.REGISTER_USER_SUCCESS:
    //   return {
    //     ...initStateReducer,
    //     isLoading: false,
    //     showAlert: true,
    //     alertText: `Welcome ${action.payload.user?.name}! Redirecting...`,
    //     alertType: "success",
    //     token: action.payload.token,
    //     user: action.payload.user,
    //     jobLocation: action.payload.location,
    //     userLocation: action.payload.location,
    //   };
    // case ACTIONS.REGISTER_USER_ERROR:
    //   return {
    //     ...initStateReducer,
    //     isLoading: false,
    //     showAlert: true,
    //     alertText: action.payload.message,
    //     alertType: "danger",
    //   };
    // LOGINNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN
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
    default:
      throw new Error(`This action does not exist: ${action.type}`);
  }
}
