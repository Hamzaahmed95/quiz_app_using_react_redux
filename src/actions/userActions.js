import {
  LOGIN_SUCCESS,
  LOGUT_SUCCESS,
  GET_USER
} from "../constants/action-types";


 export const getUserData = () => {
  return (dispatch) => {
      dispatch(setCurrentUser(res.data));
  }
}
