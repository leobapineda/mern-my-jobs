import { ACTIONS } from "./actions";
import { initState } from "./GlobalContext";

export default function reducer(initStateReducer, action) {
  // console.log("reducer");
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
        jobLocation: initState.jobLocation,
        isEditing: false,
        editJobId: "",
        position: "",
        company: "",
        jobType: "full-time",
        status: "pending",

        //   showAlert: false,
        //   alertText: "",
        //   alertType: "",
        //   user: user ? JSON.parse(user) : null,
        //   token: token,
        //   userLocation: location,
        //   showSidebar: false,
        //   jobLocation: location,
        //   // JOB VALUES
        //   isEditing: false,
        //   editJobId: "",
        //   position: "",
        //   company: "",
        //   jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
        //   jobType: "full-time",
        //   statusOptions: ["pending", "interview", "declined"],
        //   status: "pending",
        //   // GET ALL JOBS
        //   jobs: [],
        //   totalJobs: 0,
        //   numOfPages: 1,
        //   page: 1,
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
        // this is just a precaution
        // showAlert: false,
        // isEditing: false,
        //al llegar aqui, todo lo que tiene que ver con las alert se cancela
      };
    case ACTIONS.GET_JOBS_SUCCESS:
      return {
        ...initStateReducer,
        isLoading: false,
        // showAlert: false,
        // isEditing: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };
    case ACTIONS.GET_JOBS_ERROR:
      return {
        ...initStateReducer,
        showAlert: true,
        isLoading: false,
        alertText: action.payload.message,
        alertType: "danger",
      };
    case ACTIONS.SET_EDIT_JOB:
      const job = initStateReducer.jobs.find((job) => {
        return job._id === action.payload.id;
      });
      const { _id, position, company, jobLocation, jobType, status } = job;
      return {
        ...initStateReducer,
        isLoading: false,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobType,
        status,
        jobLocation,
      };
    //edit job success
    case ACTIONS.EDIT_JOB_SUCCESS:
      console.log(initState);
      return {
        ...initState,
        showAlert: true,
        isLoading: false,
        alertText: "Job Updated",
        alertType: "success",
      };
    case ACTIONS.EDIT_JOB_ERROR:
      return {
        ...initState,
        showAlert: true,
        isLoading: false,
        alertText: action.payload.message,
        alertType: "danger",
      };
    case ACTIONS.EDIT_JOB_CANCEL:
      return initState;
    case ACTIONS.DELETE_JOBS_BEGIN:
      return { ...initStateReducer, isLoading: true };
    default:
      throw new Error(`This action does not exist: ${action.type}`);
  }
}


// const initState2 = {
//   isLoading: false,
//   showAlert: false,
//   alertText: "",
//   alertType: "",
//   user: user ? JSON.parse(user) : null,
//   token: token,
//   userLocation: location,
//   showSidebar: false,
//   jobLocation: location,
//   // JOB VALUES
//   isEditing: false,
//   editJobId: "",
//   position: "",
//   company: "",
//   jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
//   jobType: "full-time",
//   statusOptions: ["pending", "interview", "declined"],
//   status: "pending",
//   // GET ALL JOBS
//   jobs: [],
//   totalJobs: 0,
//   numOfPages: 1,
//   page: 1,
// };