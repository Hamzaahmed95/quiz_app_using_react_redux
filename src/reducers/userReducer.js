import { LOGIN_SUCCESS, LOGUT_SUCCESS, GET_APP_STATE } from "../constants/action-types";

const initialState = {
  user: {},
  isLoggedIn: false,
  appState: null
};

const userReducer = (state = initialState, action) => {
  if (action.type === LOGIN_SUCCESS) {
    return  {
      ...state,
      user: action.payload,
      isLoggedIn: true,
    };
  }
  if(action.type === GET_APP_STATE) {
    return {
      ...state,
      appState: action.payload,
    }
  } 
  return state;
}

export default userReducer;
