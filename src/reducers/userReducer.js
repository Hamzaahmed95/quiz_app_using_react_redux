import { LOGIN_SUCCESS, LOGUT_SUCCESS, GET_USER } from "../constants/action-types";

const initialState = {
  user: {},
  isLoggedIn: false,
};

const userReducer = (state = initialState, action) => {
  if (action.type === LOGIN_SUCCESS) {
    return  {
      ...state,
      user: action.payload,
      isLoggedIn: true,
    };
  }
  if(action.type === LOGUT_SUCCESS) {
    return {
      ...state,
      isLoggedIn: false,
    }
  } 
  return state;
}

export default userReducer;
