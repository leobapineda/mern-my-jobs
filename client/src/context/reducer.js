import { ACTIONS } from "./actions";
import { initState } from "./GlobalContext";

export default function reducer(initStateReducer, action) {
  switch (action.type) {
    case ACTIONS.DISPLAY_ALERT:
      return {
        isLoading: false,
        showAlert: true,
        alertText: "Please provide all values",
        alertType: "danger",
      };
    case ACTIONS.HIDE_ALERT:
      return initState;
    default:
      throw new Error(`This action does not exist: ${action.type}`);
  }
}
