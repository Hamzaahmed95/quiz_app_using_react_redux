import {
  LOGIN_SUCCESS,
  GET_APP_STATE,
  LOGIN_FAILED
} from "../constants/action-types";
import firebase from "firebase";

export const getUserData = value => {
  return dispatch => {
    firebase
      .database()
      .ref("user")
      .orderByChild("id")
      .equalTo(value)
      .on("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            console.log(data.val());
            localStorage.setItem("id", data.child("id").val());
            dispatch({ type: LOGIN_SUCCESS, payload: data.val() });
          });
        } else {
          dispatch({ type: LOGIN_FAILED, payload: "" });
        }
      });
  };
};

export const getAppState = () => {
  return dispatch => {
    firebase
      .database()
      .ref("appState")
      .on("value", snapshot => {
        if (snapshot.exists()) {
          snapshot.forEach(function(data) {
            console.log(data.val(), "awssssawssssawssss");
            dispatch({ type: GET_APP_STATE, payload: data.val() });
          });
        } else {
          console.log("asdasxzczxc show toast invalid ID");
        }
      });
  };
};
