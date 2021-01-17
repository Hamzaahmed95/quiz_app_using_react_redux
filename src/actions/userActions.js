import {
  LOGIN_SUCCESS,
  LOGUT_SUCCESS,
  GET_USER
} from "../constants/action-types";
import firebase from "firebase";

 export const getUserData = (value) => {
  return (dispatch) => {
    firebase
      .database()
      .ref("user")
      .orderByChild("id")
      .equalTo(value)
      .on("value", snapshot => {
        snapshot.forEach(function (data) {
         console.log(data.val());
         if(data.val()){
          localStorage.setItem("id", data.child("id").val());
          dispatch({ type: LOGIN_SUCCESS, payload: data.val() });
         }
         else{
           console.log(data.val(),"usereee");
         }
        });
      });
  }
}
