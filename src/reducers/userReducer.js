import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  GET_APP_STATE,
  START_QUIZ,
  USER_RESULT
} from "../constants/action-types";

const initialState = {
  user: {},
  isLoggedIn: false,
  loginSuccess: false,
  appState: null,
  error: false,
  userResult: {}
};

const userReducer = (state = initialState, action) => {
  if (action.type === LOGIN_SUCCESS) {
    return {
      ...state,
      user: action.payload,
      error: false,
      loginSuccess: true,
    };
  }
  if (action.type === LOGIN_FAILED) {
    return {
      ...state,

      error: true
    };
  }
  if (action.type === GET_APP_STATE) {
    return {
      ...state,
      appState: action.payload
    };
  }
  if (action.type === START_QUIZ) {
    return {
      ...state,
      isLoggedIn: true
    };
  }
  if (action.type === USER_RESULT) {
    return {
      ...state,
      userResult: action.payload
    };
  }
  return state;
};

export default userReducer;
